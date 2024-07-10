import { SyntheticEvent } from 'react'

import { Alert, Button, Fade, Grow, Slide, SlideProps } from '@mui/material'
import MuiSnackbar from '@mui/material/Snackbar'
import { IconButton } from 'components'

import useToast from 'hooks/useToast'

import { KeyedObject } from 'types'

import { CloseOutlined } from '@ant-design/icons'

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return (
    <Slide
      {...props}
      direction="left"
    />
  )
}

function TransitionSlideUp(props: SlideProps) {
  return (
    <Slide
      {...props}
      direction="up"
    />
  )
}

function TransitionSlideRight(props: SlideProps) {
  return (
    <Slide
      {...props}
      direction="right"
    />
  )
}

function TransitionSlideDown(props: SlideProps) {
  return (
    <Slide
      {...props}
      direction="down"
    />
  )
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />
}

// animation options
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade,
}

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
  const {
    open,
    message,
    anchorVertical,
    anchorHorizontal,
    variant,
    alertColor,
    alertVariant,
    transition,
    close,
    actionButton,
    closeToast,
  } = useToast()

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    closeToast()
  }

  return (
    <>
      {/* default snackbar */}
      {variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={{
            vertical: anchorVertical,
            horizontal: anchorHorizontal,
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          TransitionComponent={animation[transition]}
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{ mt: 0.25 }}>
                <CloseOutlined />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[transition]}
          anchorOrigin={{
            vertical: anchorVertical,
            horizontal: anchorHorizontal,
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert
            variant={alertVariant}
            color={alertColor}
            action={
              <>
                {actionButton !== false && (
                  <Button
                    color={alertColor}
                    size="small"
                    onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {close !== false && (
                  <IconButton
                    sx={{ mt: 0.25 }}
                    size="small"
                    aria-label="close"
                    variant="contained"
                    color={alertColor}
                    onClick={handleClose}>
                    <CloseOutlined />
                  </IconButton>
                )}
              </>
            }
            sx={{
              ...(alertVariant === 'outlined' && {
                bgcolor: 'grey.0',
              }),
            }}>
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  )
}

export default Snackbar
