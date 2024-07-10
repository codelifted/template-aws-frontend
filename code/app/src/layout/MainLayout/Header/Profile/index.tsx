import { SyntheticEvent, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

import { ProfileMenu } from 'components'

import useAuth from 'hooks/useAuth'

import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons'

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const queryClient = useQueryClient()

  const { logout, user } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      queryClient.clear()
    } catch (err) {
      console.error(err)
    }
  }

  const anchorRef = useRef<any>(null)
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setTimeout(() => setOpen(false), 300)
  }

  const onClick = (e: SyntheticEvent, route: string) => {
    navigate(route)
    setTimeout(() => setOpen(false), 300)
  }

  const isSelected = (route: string) => {
    return location.pathname === route
  }

  const menu = [
    {
      id: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: (e: SyntheticEvent) => onClick(e, '/profile'),
      selected: isSelected('/profile'),
    },
    {
      id: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return (
    <ProfileMenu
      open={open}
      anchorEl={null}
      handleClick={handleToggle}
      onClose={handleClose}
      menuItems={menu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      userEmail={user?.attributes?.email || ''}
      username={user?.attributes?.name || ''}
    />
  )
}

export default Profile
