import React from 'react'

import { useTheme } from '@mui/material'
import List, { ListProps as MuListProps } from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'

import CollapsibleListItem from './CollapsibleListItem'

export type SidebarListItem = {
  title: string
  icon: React.ReactNode
  link?: string
  isSelected?: boolean
  subItems?: {
    link?: string
    title: string
    isSelected?: boolean
  }[]
}
export type SidebarListProps = MuListProps & {
  listItems: SidebarListItem[]
  headerTitle: string
  onClickRoute: (selectedRoute: string, selectedSubroute?: string) => void
}

const SidebarList = ({
  listItems,
  headerTitle,
  onClickRoute,
  ...others
}: SidebarListProps) => {
  const theme = useTheme()
  return (
    <List
      {...others}
      sx={{
        width: '278px',
        padding: 3,
        overflow: 'hidden',
        margin: 0,
        borderRadius: 0,
        border: 0,
        backgroundColor: 'transparent',
        paddingBottom: 0,
        '& .MuiListItem-root': {
          border: 0,
          padding: 0,
        },
        '& .MuiList-root': {
          border: 0,
          padding: 0,
        },
        '& .MuiButtonBase-root': {
          gap: '3px',
          padding: '8px',
          minHeight: '46px',
        },
        '& .MuiListSubheader-root': {
          border: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'transparent',
          color: theme.palette.primary.darker,
        },
        '& .MuiListItemIcon-root': {
          margin: 0,
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          fontSize: '1.1rem',
          minWidth: '34px',
        },
        '& .MuiCollapse-wrapper': {
          '& .MuiButtonBase-root': {
            paddingLeft: '18px',
          },
          '& .MuiSvgIcon-root': {
            width: '10px',
            height: '10px',
          },
        },
        '& .MuiListItemButton-root': {
          padding: 0,
        },
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ pl: 0, fontSize: '12px', color: 'primary.main', opacity: 0.8 }}
          disableSticky>
          {headerTitle}
        </ListSubheader>
      }>
      {listItems.map(listItem => {
        return (
          <CollapsibleListItem
            key={listItem.title}
            listItem={listItem}
            onClickRoute={onClickRoute}
          />
        )
      })}
    </List>
  )
}

export default SidebarList
