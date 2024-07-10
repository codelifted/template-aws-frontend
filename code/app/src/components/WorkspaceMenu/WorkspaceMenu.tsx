import { MouseEventHandler } from 'react'

import { Box, Button, Typography, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'

import Menu, { MenuProps } from './Menu'

import AddIcon from '@mui/icons-material/Add'

export type Workspace = {
  name: string
  description: string
  selected?: boolean
  onWorkspaceClick: MouseEventHandler | undefined
}
export type WorkspaceMenuProps = MenuProps & {
  workspaces: Workspace[]
  onAddWorkspaceClick: MouseEventHandler | undefined
}

function stringAvatar(name: string | undefined) {
  if (!name) {
    return {
      children: 'XY',
    }
  }
  const nameArr = name?.split(' ')
  return {
    children: `${nameArr[0][0]}${nameArr?.[1]?.[0] || ''}`,
  }
}

const WorkspaceMenu = ({
  workspaces,
  onAddWorkspaceClick,
  ...others
}: WorkspaceMenuProps) => {
  const theme = useTheme()
  return (
    <>
      <Menu
        {...others}
        sx={{
          '& .MuiPaper-root': {
            width: '240px',
            marginTop: '35px',
            borderRadius: '4px',
            left: {
              xxl: 'calc(100% - (100% - 1720px) - 350px)!important',
              xs: 'calc(100% - 350px)!important',
            },
          },
          '& .MuiMenu-list': {
            border: 0,
            py: 0,
          },
          '& .MuiButtonBase-root': {
            border: 0,
            borderBottom: `1px solid ${theme.palette.primary[100]}`,
          },
        }}>
        <Box
          sx={{
            maxHeight: '248px',
            overflow: 'auto',
            borderBottom: `1px solid ${theme.palette.primary[100]}`,
          }}>
          {workspaces?.map((workspace, index) => {
            return (
              <Menu.MenuItem
                key={workspace.name + index}
                selected={workspace.selected}
                onClick={workspace?.onWorkspaceClick}>
                <Box
                  component={'div'}
                  sx={{ display: 'flex', gap: '10px' }}>
                  <Box>
                    <Avatar
                      alt="Work Space Avatar"
                      sx={{
                        backgroundColor: 'primary.main',
                      }}
                      {...stringAvatar(workspace.name)}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px',
                      }}>
                      {workspace.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--mui-palette-text-secondary)',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}>
                      {workspace.description}
                    </Typography>
                  </Box>
                </Box>
              </Menu.MenuItem>
            )
          })}
        </Box>
        <Menu.MenuItem
          sx={{ padding: 0 }}
          onClick={onAddWorkspaceClick}>
          <Button
            disableRipple
            variant="text"
            color="secondary"
            startIcon={<AddIcon />}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              padding: '15px 16px',
              lineHeight: '20px',
              height: 'auto',
            }}>
            Add Workspace
          </Button>
        </Menu.MenuItem>
      </Menu>
    </>
  )
}

export default WorkspaceMenu
