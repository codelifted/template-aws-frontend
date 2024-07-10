import React, { createContext, useState } from 'react'

import { SnackbarContextType, SnackbarProps, ToastProps } from 'types'

const ToastContext = createContext<SnackbarContextType | null>(null)

export const ToastProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const initialState: SnackbarProps = {
    open: false,
    message: 'Note archived',
    anchorVertical: 'top',
    anchorHorizontal: 'right',
    variant: 'alert',
    alertColor: 'success',
    alertVariant: 'outlined',
    transition: 'Fade',
    close: false,
    actionButton: false,
  }

  const [state, setState] = useState(initialState)

  const toast = (config: ToastProps) => {
    setState({
      ...state,
      ...config,
      open: true,
    })
  }

  const closeToast = () => {
    setState({
      ...state,
      open: false,
    })
  }

  return (
    <ToastContext.Provider
      value={{
        ...state,
        toast,
        closeToast,
      }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContext
