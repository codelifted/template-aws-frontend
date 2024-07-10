import { useLocation, useNavigate } from 'react-router'

import { SidebarList } from 'components'

import MiniDrawer from '../MiniDrawer'

import { HomeOutlined } from '@ant-design/icons'

const Navigation = ({ open }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const listItems = [
    {
      title: 'Home',
      icon: <HomeOutlined />,
      link: '/home',
      isSelected: location.pathname.includes('/home'),
    },
  ]

  const onClickRoute = (route: string) => {
    navigate(route, { replace: true })
  }

  if (!open) {
    return (
      <MiniDrawer
        listItems={listItems}
        onClickRoute={onClickRoute}
      />
    )
  }

  return (
    <SidebarList
      headerTitle="DASHBOARD"
      listItems={listItems}
      onClickRoute={onClickRoute}
    />
  )
}

interface Props {
  open: boolean
}

export default Navigation
