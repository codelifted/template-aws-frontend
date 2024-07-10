import { Box } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

// ==============================|| DRAWER HEADER - STYLED ||============================== //

interface Props {
  theme: Theme
  open: boolean
}

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }: Props) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(open ? 4 : 0),
  paddingTop: '20px',
  paddingBottom: 0,
}))

export default DrawerHeaderStyled
