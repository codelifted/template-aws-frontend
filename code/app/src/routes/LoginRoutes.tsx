import { lazy } from 'react'

import { Loadable } from 'components'

import CommonLayout from 'layout/CommonLayout'
import GuestGuard from 'utils/route-guard/GuestGuard'

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/user-auth/login')))
const AuthRegister = Loadable(lazy(() => import('pages/user-auth/register')))
const AuthForgotPassword = Loadable(
  lazy(() => import('pages/user-auth/forgot-password'))
)
const AuthCheckMail = Loadable(lazy(() => import('pages/user-auth/check-mail')))
const AuthResetPassword = Loadable(
  lazy(() => import('pages/user-auth/reset-password'))
)
const AuthCodeVerification = Loadable(
  lazy(() => import('pages/user-auth/code-verification'))
)

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <CommonLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: '/',
          element: <AuthLogin />,
        },
        {
          path: 'login',
          element: <AuthLogin />,
        },
        {
          path: 'register',
          element: <AuthRegister />,
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />,
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />,
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />,
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />,
        },
        {
          path: '*',
          element: <AuthLogin />,
        },
      ],
    },
  ],
}

export default LoginRoutes
