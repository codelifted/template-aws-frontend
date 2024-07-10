import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

import { drawerWidth } from 'config'

// ==============================|| HEADER - APP BAR STYLED ||============================== //

interface Props extends MuiAppBarProps {
  open?: boolean
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<Props>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7.5)})`,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    borderLeft: '0!important',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default AppBarStyled
