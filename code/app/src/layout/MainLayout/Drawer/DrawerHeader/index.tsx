import { useTheme } from '@mui/material/styles'
import { Logo } from 'components'

import useConfig from 'hooks/useConfig'
import DrawerHeaderStyled from './DrawerHeaderStyled'

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean
}

const DrawerHeader = ({ open }: Props) => {
  const theme = useTheme()
  const { defaultPath } = useConfig()

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}>
      <Logo
        to={defaultPath}
        sx={{ width: open ? 'auto' : 35, height: 35 }}
      />
    </DrawerHeaderStyled>
  )
}

export default DrawerHeader
