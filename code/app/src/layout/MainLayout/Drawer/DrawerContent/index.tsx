import { SimpleBar } from 'components'

import Navigation from './Navigation'

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = ({ open }: Props) => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column',
      },
    }}>
    <Navigation open={open} />
  </SimpleBar>
)

interface Props {
  open: boolean
}

export default DrawerContent
