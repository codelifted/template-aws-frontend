import { DefaultConfigProps } from 'types'

export const drawerWidth = 280

// ==============================|| AWS COGNITO CONFIG  ||============================== //
export const awsconfig = {
  Auth: {
    oauth: {
      domain: 'auth.' + process.env.REACT_APP_ROOT_DOMAIN,
    },
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: 'eu-west-1',
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
    mandatorySignIn: true,
    localStorage: {
      domain: 'app.' + process.env.REACT_APP_ROOT_DOMAIN,
      path: '/',
      expires: 365,
      secure: true,
    },
  },
}

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  defaultPath: '/home',
  workspace: '1',
  fontFamily: `'Inter', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  drawerOpen: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
}

export default config
