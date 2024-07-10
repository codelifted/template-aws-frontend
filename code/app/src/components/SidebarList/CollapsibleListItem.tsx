import React from 'react'

import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton, {
  ListItemButtonProps as MuiListItemButtonProps,
} from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { SidebarListItem } from './SidebarList'

import CircleIcon from '@mui/icons-material/Circle'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export type CollapsibleListItemProps = MuiListItemButtonProps & {
  listItem: SidebarListItem
  onClickRoute: (selectedRoute: string, selectedSubroute?: string) => void
}

const CollapsibleListItem = ({
  listItem,
  onClickRoute,
  ...others
}: CollapsibleListItemProps) => {
  const { subItems, link, isSelected, icon, title } = listItem || {}

  const [open, setOpen] = React.useState(isSelected)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton
        onClick={() => {
          handleClick()
          if (!subItems) {
            onClickRoute(link!)
          }
        }}
        sx={{
          gap: '16px',
          borderRadius: '8px',
          padding: '12px 12px 12px 12px',
          backgroundColor:
            isSelected && !subItems ? 'primary.main' : 'transparent',
          color: isSelected && !subItems ? 'white' : 'primary.main',
          ':hover': {
            backgroundColor:
              isSelected && !subItems ? 'primary.main' : 'transparent',
            color: isSelected && !subItems ? 'white' : 'primary.main',
          },
        }}
        {...others}>
        <ListItemIcon
          sx={{
            minWidth: '16px',
            '& svg': {
              pl: 0.3,
              mx: 1,
              width: '20px',
              height: '20px',
              color: isSelected && !subItems ? 'white' : 'primary.main',
            },
          }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{
            margin: 0,
            '& .MuiTypography-root': {
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: 'normal',
            },
          }}
        />
        {subItems && (
          <>
            {open ? (
              <ExpandLess sx={{ color: 'primary.main' }} />
            ) : (
              <ExpandMore sx={{ color: 'primary.main' }} />
            )}
          </>
        )}
      </ListItemButton>
      {subItems && (
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit>
          {subItems?.map((subItem, i) => {
            return (
              <List
                key={i}
                component="div"
                disablePadding>
                <ListItemButton
                  onClick={() => {
                    onClickRoute(subItem.link!)
                  }}
                  sx={{
                    gap: '16px',
                    borderRadius: '8px',
                    padding: '12px 12px 12px 32px',
                    backgroundColor: subItem.isSelected
                      ? 'primary.main'
                      : 'transparent',
                    color: subItem.isSelected ? 'white' : 'primary.main',
                    ':hover': {
                      backgroundColor: subItem.isSelected
                        ? 'primary.main'
                        : 'transparent',
                      color: subItem.isSelected ? 'white' : 'primary.main',
                    },
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: '16px',
                      '& .MuiSvgIcon-root': {
                        width: '8px',
                        height: '8px',
                        color: subItem.isSelected
                          ? 'secondary.main'
                          : 'primary.main',
                      },
                    }}>
                    <CircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={subItem.title}
                    sx={{
                      margin: 0,
                      '& .MuiTypography-root': {
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: 'normal',
                      },
                    }}
                  />
                </ListItemButton>
              </List>
            )
          })}
        </Collapse>
      )}
    </>
  )
}

export default CollapsibleListItem
