import { ReactElement } from 'react'

// ==============================|| AUTH TYPES  ||============================== //

export type GuardProps = {
  children: ReactElement | null
}

export type UserAttributes = {
  email?: string
  email_verified?: boolean
  phone_number?: string
  name?: string
}

type UserProfile = {
  username?: string
  attributes?: UserAttributes
  signInUserSession?: UserSession
}

type UserSession = {
  accessToken?: AccessToken
}

type AccessToken = {
  jwtToken?: string
}

export interface AuthProps {
  user?: UserProfile | null
  email?: string
}

export interface AuthActionProps {
  type: string
  payload?: AuthProps
}

export type AWSCognitoContextType = {
  isLoggedIn?: boolean
  isInitialized?: boolean
  user?: UserProfile | null | undefined
  email?: string
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  register: (
    email: string,
    password: string,
    phone_number: string,
    fullname: string,
    marketing_consent?: boolean
  ) => Promise<unknown>
  resetPassword: (email: string) => Promise<void>
  forgotPasswordSubmit: (code: string, newPassword: string) => Promise<void>
  confirmEmail: (code: string) => Promise<unknown>
  resendCode: () => Promise<void>
  sendVerifCode: () => Promise<void>
  verifyEmail: (code: string) => Promise<void>
  updateProfile: (attributes: UserAttributes) => Promise<void>
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>
  refreshToken: () => Promise<void>
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean
  isInitialized?: boolean
  email?: string
  user?: UserProfile | null | undefined
}

export interface RegistrationAttributes {
  name: string
  email: string
  phone_number: string
  'custom:marketing_consent'?: string
}
