// eslint-disable-next-line
import * as Theme from '@mui/material/styles';


import { CustomShadowProps } from 'types'

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowProps
  }
}
