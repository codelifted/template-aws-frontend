import { useRef, useState } from 'react'

import { WorkspaceMenu } from 'components'

import useConfig from 'hooks/useConfig'
import useToast from 'hooks/useToast'

const data = [
  {
    id: '1',
    name: 'Workspace 1',
    status: 'active',
    user_role: 'Admin',
  },
  {
    id: '2',
    name: 'Workspace 2',
    status: 'active',
    user_role: 'Admin',
  },
  {
    id: '3',
    name: 'Workspace 3',
    status: 'creating',
    user_role: 'Admin',
  },
]

const Workspaces = () => {
  const { workspace, onChangeWorkspace } = useConfig()

  const { toast } = useToast()
  const anchorRef = useRef<any>(null)
  const [open, setOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <WorkspaceMenu
        open={open}
        handleClick={handleClick}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        buttonTitle={data.find(ws => ws.id === workspace)?.name}
        onAddWorkspaceClick={() => {
          toast({ message: 'Add workspace', alertColor: 'success' })
        }}
        workspaces={
          data.map(el => ({
            name: el.name || '',
            selected: el.id === workspace,
            description:
              el.status === 'creating' || el.status === 'waiting'
                ? 'Creating...'
                : el.user_role!,
            onWorkspaceClick: () => {
              onChangeWorkspace(el.id!)
              setTimeout(() => setOpen(false), 300)
            },
          })) || []
        }
      />
    </>
  )
}

export default Workspaces
