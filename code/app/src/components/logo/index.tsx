import { Link } from 'react-router-dom'

import { ButtonBase } from '@mui/material'
import { SxProps } from '@mui/system'

import config from 'config'
import { To } from 'history'
import LogoIcon from './LogoIcon'
import Logo from './LogoMain'

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean
  isIcon?: boolean
  sx?: SxProps
  to?: To
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => (
  <ButtonBase
    disableRipple
    component={Link}
    to={!to ? config.defaultPath : to}
    sx={sx}>
    {isIcon ? <LogoIcon /> : <Logo reverse={reverse} />}
  </ButtonBase>
)

export default LogoSection
