import { Box, Tooltip } from '@mui/material'
import List, { ListProps as MuListProps } from '@mui/material/List'

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
  onClickRoute: (selectedRoute: string, selectedSubroute?: string) => void
}

const MiniDrawer = ({
  listItems,
  onClickRoute,
  ...others
}: SidebarListProps) => {
  return (
    <List
      {...others}
      sx={{
        width: '58px',
        padding: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        margin: 0,
        marginTop: '20px',
        borderRadius: 0,
        border: 0,
        backgroundColor: 'transparent',
        paddingBottom: 0,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      {listItems.map((listItem, i) => {
        return (
          <Tooltip
            key={i}
            title={listItem.title}>
            <Box
              onClick={() =>
                onClickRoute(listItem?.subItems?.[0].link || listItem.link!)
              }
              sx={{
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: listItem.isSelected
                  ? 'primary.main'
                  : 'transparent',
                color: listItem.isSelected ? 'white' : 'primary.main',
                height: '40px',
                width: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& svg': {
                  width: '22px',
                  height: '22px',
                },
              }}>
              {listItem.icon}
            </Box>
          </Tooltip>
        )
      })}
    </List>
  )
}

export default MiniDrawer
