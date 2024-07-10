import { MouseEventHandler } from 'react'

import { Box, Typography, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Menu, { MenuProps } from 'components/WorkspaceMenu/Menu'

type MenuItem = {
  id: string
  icon?: JSX.Element
  label: string
  selected?: boolean
  onClick: MouseEventHandler
}

export type ProfileMenuProps = MenuProps & {
  username: string
  userEmail: string
  menuItems: MenuItem[]
}

const ProfileMenu = ({
  menuItems,
  username,
  userEmail,
  ...others
}: ProfileMenuProps) => {
  const theme = useTheme()
  return (
    <>
      <Menu
        sx={{
          '& .MuiMenu-list': {
            border: 0,
            py: 0,
          },
          '& .MuiPaper-root': {
            borderRadius: '4px',
            width: '280px',
            marginTop: '35px',
            left: {
              xxl: 'calc(100% - (100% - 1720px) - 300px)!important',
              xs: 'calc(100% - 300px)!important',
            },
          },
          '& .MuiButtonBase-root': {
            border: 0,
            py: 1,
            borderBottom: `1px solid ${theme.palette.primary[100]}`,
            '& span': {
              pr: 1,
            },
          },
        }}
        username={username || userEmail}
        {...others}>
        <Menu.MenuItem
          disableRipple
          sx={{ cursor: 'default' }}>
          <Box
            component={'div'}
            sx={{ display: 'flex', gap: '10px' }}>
            <Box>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={
                  <span
                    style={{
                      backgroundColor: 'var(--mui-palette-secondary-400)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '8px',
                      height: '8px',
                    }}></span>
                }>
                <Avatar alt="User Avatar">
                  {username[0]?.toUpperCase() || userEmail[0]?.toUpperCase()}
                </Avatar>
              </Badge>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '20px',
                }}>
                {username}
              </Typography>
              <Typography
                sx={{
                  color: 'var(--mui-palette-text-secondary)',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '18px',
                }}>
                {userEmail}
              </Typography>
            </Box>
          </Box>
        </Menu.MenuItem>
        {menuItems.map(item => (
          <Menu.MenuItem
            key={item.id}
            onClick={item.onClick}
            selected={item.selected}
            disableRipple>
            {item.icon}
            {item.label}
          </Menu.MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ProfileMenu
