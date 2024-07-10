import React, { createContext, useEffect, useReducer } from 'react'

import { Loader } from 'components'

import { Auth, Hub } from 'aws-amplify'
import useToast from 'hooks/useToast'

import {
  AuthActionProps,
  AWSCognitoContextType,
  InitialLoginContextProps,
  RegistrationAttributes,
  UserAttributes,
} from 'types'

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  email: '',
  user: null,
}

// ==============================|| AWS Cognito CONTEXT & PROVIDER ||============================== //

const AWSCognitoContext = createContext<AWSCognitoContextType | null>(null)

export const AWSCognitoProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const reducer = (state = initialState, action: AuthActionProps) => {
    switch (action.type) {
      case 'login': {
        const { user } = action.payload!

        // FIXME: Here you should set the token in your requests (suggested way to do it) and delete the console.log
        // axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
        const jwt = user?.signInUserSession?.accessToken?.jwtToken
        console.log('jwt', jwt)

        return {
          ...state,
          isLoggedIn: true,
          isInitialized: true,
          user,
        }
      }
      case 'logout': {
        // FIXME: Here you should remove the token from your requests (suggested way to do it)
        // axios.defaults.headers.common['Authorization'] = ''

        return {
          ...state,
          isInitialized: true,
          isLoggedIn: false,
          user: null,
        }
      }
      case 'email': {
        const { email } = action.payload!
        return {
          ...state,
          email,
        }
      }
      case 'email_verified': {
        return {
          ...state,
          user: {
            ...state.user,
            attributes: {
              ...state?.user?.attributes,
              email_verified: true,
            },
          },
        }
      }
      default: {
        return { ...state }
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { toast } = useToast()

  useEffect(() => {
    const init = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        if (user) {
          dispatch({
            type: 'login',
            payload: {
              user,
            },
          })
        } else {
          dispatch({ type: 'logout' })
        }
      } catch (err) {
        console.log(err)
        dispatch({ type: 'logout' })
      }
    }

    init()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const user = await Auth.signIn(email.toLowerCase(), password)
      dispatch({
        type: 'login',
        payload: {
          user,
        },
      })
    } catch (err: any) {
      toast({ message: err?.message || 'Login Error', alertColor: 'error' })
    }
  }

  const refreshToken = async () => {
    try {
      const data = await Auth.currentSession()
      const accessToken = data.getAccessToken()

      // FIXME: Here you should set the token in your requests (suggested way to do it) and delete the console.log
      // axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      const jwt = accessToken.getJwtToken()
      console.log('jwt', jwt)

      toast({
        message: 'Your session was successfully updated. Try again',
        alertColor: 'info',
      })
    } catch (err: any) {
      toast({ message: err?.message || 'Login Error', alertColor: 'error' })
    }
  }

  const register = async (
    email: string,
    password: string,
    phone_number: string,
    fullname: string,
    marketing_consent?: boolean
  ) => {
    try {
      const username = email.replace('@', 'a.').toLowerCase()

      let attributes: RegistrationAttributes = {
        name: fullname,
        email: email.toLowerCase(),
        phone_number: phone_number,
      }

      if (marketing_consent) {
        attributes['custom:marketing_consent'] = marketing_consent + ''
      }

      await Auth.signUp({
        username,
        password,
        attributes,
        autoSignIn: { enabled: true },
      })
      toast({
        message: 'Please confirm your registration. Check email.',
        alertColor: 'success',
      })

      dispatch({
        type: 'email',
        payload: { email: username },
      })
    } catch (err: any) {
      toast({
        message: err?.message || 'Registration Error',
        alertColor: 'error',
      })
    } finally {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'register',
      })
    }
  }

  const logout = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      if (user) {
        await Auth.signOut({ global: true })
        dispatch({ type: 'logout' })
      }
    } catch (err: any) {
      toast({ message: err?.message || 'Logout Error', alertColor: 'error' })
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await Auth.forgotPassword(email.toLowerCase())
      toast({
        message: 'Code was sent. Check your email.',
        alertColor: 'success',
      })

      dispatch({
        type: 'email',
        payload: { email: email.toLowerCase() },
      })
    } catch (err: any) {
      toast({ message: err?.message || 'Reset Error', alertColor: 'error' })
    }
  }

  const forgotPasswordSubmit = async (code: string, newPassword: string) => {
    if (!state?.email) return
    try {
      await Auth.forgotPasswordSubmit(state.email, code, newPassword)
      toast({ message: 'Password was changed', alertColor: 'success' })

      dispatch({
        type: 'email',
        payload: { email: '' },
      })
    } catch (err: any) {
      toast({ message: err?.message || 'Reset Error', alertColor: 'error' })
    }
  }

  const confirmEmail = async (code: string) => {
    if (!state?.email) return
    try {
      await Auth.confirmSignUp(state.email, code, {
        forceAliasCreation: false,
      })
      toast({ message: 'Registration is completed', alertColor: 'success' })

      dispatch({
        type: 'email',
        payload: { email: '' },
      })

      Hub.listen('auth', ({ payload }) => {
        const { event } = payload
        if (event === 'autoSignIn') {
          const user = payload.data
          dispatch({
            type: 'login',
            payload: {
              user,
            },
          })
        }
      })
    } catch (err: any) {
      toast({
        message: err?.message || 'Confirmation Error',
        alertColor: 'error',
      })
    }
  }

  const resendCode = async () => {
    if (!state?.email) return
    try {
      await Auth.resendSignUp(state.email)
      toast({
        message: 'Code was sent. Check your email.',
        alertColor: 'success',
      })
    } catch (err: any) {
      toast({
        message: err?.message || 'Sending Code Error',
        alertColor: 'error',
      })
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(user, oldPassword, newPassword)
      toast({ message: 'Password was changed', alertColor: 'success' })

      const updated = await Auth.currentAuthenticatedUser()
      if (updated) {
        dispatch({
          type: 'login',
          payload: {
            user: updated,
          },
        })
      }
    } catch (err: any) {
      toast({
        message: err?.message || 'Changing Password Error',
        alertColor: 'error',
      })
    }
  }

  const updateProfile = async (attributes: UserAttributes) => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.updateUserAttributes(user, attributes)
      toast({ message: 'Personal info was updated', alertColor: 'success' })

      const updated = await Auth.currentAuthenticatedUser()
      if (updated) {
        dispatch({
          type: 'login',
          payload: {
            user: updated,
          },
        })
      }
    } catch (err: any) {
      toast({ message: err?.message || 'Updating Error', alertColor: 'error' })
    }
  }

  const sendVerifCode = async () => {
    try {
      await Auth.verifyCurrentUserAttribute('email')
      toast({
        message: 'Code was sent. Check your email.',
        alertColor: 'success',
      })
    } catch (err: any) {
      toast({
        message: err?.message || 'Sending Code Error',
        alertColor: 'error',
      })
    }
  }

  const verifyEmail = async (code: string) => {
    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code)
      toast({ message: 'Email was verified', alertColor: 'success' })
      dispatch({ type: 'email_verified' })
    } catch (err: any) {
      toast({
        message: err?.message || 'Email Verification Error',
        alertColor: 'error',
      })
    }
  }

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />
  }

  return (
    <AWSCognitoContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        resetPassword,
        forgotPasswordSubmit,
        confirmEmail,
        resendCode,
        updateProfile,
        changePassword,
        sendVerifCode,
        verifyEmail,
        refreshToken,
      }}>
      {children}
    </AWSCognitoContext.Provider>
  )
}

export default AWSCognitoContext
