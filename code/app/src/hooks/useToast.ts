import { useContext } from 'react'

import ToastContext from 'contexts/ToastContext'

// ==============================|| CONFIG - HOOKS  ||============================== //

const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) throw new Error('context must be use inside provider')

  return context
}

export default useToast
