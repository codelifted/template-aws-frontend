import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import {
  Box,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
  // useMediaQuery,
} from '@mui/material'

//import { useTheme } from '@mui/material/styles'
import useConfig from 'hooks/useConfig'
import Drawer from './Drawer'
import Footer from './Footer'
import Header from './Header'

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme()

  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'))

  const { container, miniDrawer, drawerOpen, onChangeDrawerOpen } = useConfig()

  // drawer toggler
  const [open, setOpen] = useState(!miniDrawer || drawerOpen)
  const handleDrawerToggle = () => {
    setOpen(!open)
    onChangeDrawerOpen(!open)
  }

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      setOpen(!matchDownLG)
      onChangeDrawerOpen(!matchDownLG)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG])

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Drawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {container && (
          <Container
            maxWidth="xl"
            sx={{
              px: { xs: 0, sm: 2 },
              position: 'relative',
              minHeight: 'calc(100vh - 110px)',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Outlet />
            <Footer />
          </Container>
        )}
        {!container && (
          <Box
            sx={{
              position: 'relative',
              minHeight: 'calc(100vh - 110px)',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Outlet />
            <Footer />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MainLayout
