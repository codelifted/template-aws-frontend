import { ReactNode, useMemo } from 'react'

import {
  AppBar,
  AppBarProps,
  Stack,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconButton } from 'components'

import useConfig from 'hooks/useConfig'
import Workspaces from 'sections/workspaces'
import AppBarStyled from './AppBarStyled'
import Profile from './Profile'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

interface Props {
  open: boolean
  handleDrawerToggle?: () => void
}

const Header = ({ open, handleDrawerToggle }: Props) => {
  const { drawerOpen } = useConfig()
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  // header content
  const headerProfile = useMemo(() => <Profile />, [])
  const headerWorkspaces = useMemo(() => <Workspaces />, [])

  // common header
  const mainHeader: ReactNode = (
    <Toolbar
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: drawerOpen ? '1440px' : '1660px',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        paddingBottom: 0,
        paddingTop: 0,
        minHeight: '80px',
      }}>
      <Stack
        direction="row"
        alignItems="center">
        <Tooltip title={!open ? 'Open menu' : 'Hide menu'}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            color="primary"
            sx={{
              fontSize: '1.2rem',
              ml: { xs: 0, lg: -2 },
            }}>
            {!open ? <RightOutlined /> : <LeftOutlined />}
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center">
        {headerWorkspaces}
        {headerProfile}
      </Stack>
    </Toolbar>
  )

  // app-bar params
  const appBar: AppBarProps = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      // boxShadow: theme.customShadows.z1
    },
  }

  const style = {
    backgroundColor: theme.palette.secondary.contrastText,
    border: 0,
    borderTop: 0,
    borderRight: 0,
  }

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled
          open={open}
          {...appBar}
          sx={style}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar
          {...appBar}
          sx={style}>
          {mainHeader}
        </AppBar>
      )}
    </>
  )
}

export default Header
