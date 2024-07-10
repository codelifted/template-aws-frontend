import { useMemo } from 'react'

import { Box, Drawer, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { drawerWidth } from 'config'
import DrawerContent from './DrawerContent'
import DrawerHeader from './DrawerHeader'
import MiniDrawerStyled from './MiniDrawerStyled'

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  open: boolean
  window?: () => Window
  handleDrawerToggle?: () => void
}

const MainDrawer = ({ open, handleDrawerToggle, window }: Props) => {
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  // responsive drawer container
  const container =
    window !== undefined ? () => window().document.body : undefined

  // header content
  const drawerContent = useMemo(() => <DrawerContent open={open} />, [open])
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open])

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1200, boxShadow: 'none' }}
      aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'none',
              overflow: 'hidden',
            },
          }}
          open={open}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}>
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  )
}

export default MainDrawer
