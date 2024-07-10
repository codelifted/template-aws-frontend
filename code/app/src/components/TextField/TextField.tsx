import { useState } from 'react'

import InputAdornment from '@mui/material/InputAdornment'
import MuTextField, {
  TextFieldProps as MuTextFieldProps,
} from '@mui/material/TextField'

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'

export type TextFieldProps = MuTextFieldProps & {}

const TextField = ({ ...others }: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const getEndAdornment = () => {
    if (others?.type === 'password') {
      return (
        <InputAdornment
          position="end"
          onClick={handleTogglePasswordVisibility}
          style={{ cursor: 'pointer' }}>
          {others?.type === 'password' && showPassword ? (
            <VisibilityOffOutlinedIcon />
          ) : (
            <VisibilityOutlined />
          )}
        </InputAdornment>
      )
    }
    return undefined
  }

  return (
    <MuTextField
      {...others}
      type={others?.type === 'password' && showPassword ? 'text' : others?.type}
      InputProps={{
        endAdornment: getEndAdornment(),
      }}
    />
  )
}

export default TextField
