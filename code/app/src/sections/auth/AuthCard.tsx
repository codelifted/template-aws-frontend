import { CSSProperties, ReactNode } from 'react'

import {
  Box,
  CardContentProps,
  CardHeaderProps,
  CardProps,
  Theme,
} from '@mui/material'
import { MainCard } from 'components'

import { KeyedObject } from 'types'

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }: AuthCardProps) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
      },
    }}
    content={false}
    {...other}
    boxShadow
    shadow={(theme: Theme) => theme.customShadows.z1}>
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
  </MainCard>
)

interface AuthCardProps extends KeyedObject {
  border?: boolean
  boxShadow?: boolean
  children: ReactNode | string
  subheader?: ReactNode | string
  style?: CSSProperties
  content?: boolean
  contentSX?: CardContentProps['sx']
  darkTitle?: boolean
  divider?: boolean
  sx?: CardProps['sx']
  secondary?: CardHeaderProps['action']
  shadow?: string
  elevation?: number
  title?: ReactNode | string
  modal?: boolean
}

export default AuthCard
