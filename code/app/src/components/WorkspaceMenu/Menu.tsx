import React, { MouseEventHandler } from 'react'

import { Avatar, Button, IconButton, useTheme } from '@mui/material'
import MuMenu, { MenuProps as MuMenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export type MenuProps = MuMenuProps & {
  buttonTitle?: string
  AvatarImage?: string
  handleClick: MouseEventHandler | undefined
  isIconButton?: boolean
  iconButtonIcon?: React.ReactNode
  username?: string
}

const Menu = ({ children, buttonTitle, ...others }: MenuProps) => {
  const theme = useTheme()
  return (
    <>
      {others.isIconButton ? (
        <IconButton
          aria-controls={others.open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={others.open ? 'true' : undefined}
          onClick={others.handleClick}
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: '1px solid var(--mui-palette-primary-light)',
            padding: '10px',
          }}>
          {others.iconButtonIcon}
        </IconButton>
      ) : (
        <Button
          aria-controls={others.open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={others.open ? 'true' : undefined}
          variant="text"
          disableElevation
          onClick={others.handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            padding: '0 5px',
            '& .MuiButton-endIcon': {
              marginLeft: '0px',
            },
          }}>
          {buttonTitle && buttonTitle}
          {others.username && (
            <Avatar
              sx={{
                backgroundColor: theme.palette.secondary.main,
                width: '36px',
                height: '36px',
                fontSize: '14px',
              }}
              alt="User Avatar">
              {others?.username[0]?.toUpperCase()}
            </Avatar>
          )}
        </Button>
      )}
      <MuMenu {...others}>{children}</MuMenu>
    </>
  )
}

Menu.MenuItem = MenuItem
export default Menu
