import {
  AlertColor,
  AlertPropsColorOverrides,
  AlertPropsVariantOverrides,
} from '@mui/material'
import { OverridableStringUnion } from '@mui/types'

// ==============================|| SNACKBAR TYPES  ||============================== //

export interface ToastProps {
  open?: boolean
  message?: string
  anchorVertical?: 'top' | 'bottom'
  anchorHorizontal?: 'left' | 'center' | 'right'
  variant?: string
  alertColor?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
  alertVariant?: OverridableStringUnion<
    'standard' | 'filled' | 'outlined',
    AlertPropsVariantOverrides
  >
  transition?: string
  close?: boolean
  actionButton?: boolean
}

export interface SnackbarProps {
  open: boolean
  message: string
  anchorVertical: 'top' | 'bottom'
  anchorHorizontal: 'left' | 'center' | 'right'
  variant: string
  alertColor: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
  alertVariant: OverridableStringUnion<
    'standard' | 'filled' | 'outlined',
    AlertPropsVariantOverrides
  >
  transition: string
  close: boolean
  actionButton: boolean
}

export interface SnackbarContextType extends SnackbarProps {
  toast: (config: ToastProps) => void
  closeToast: () => void
}
