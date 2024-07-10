import { Link } from 'react-router-dom'

import { Button, Grid, Stack, Typography } from '@mui/material'
import { AnimateButton } from 'components'

import useAuth from 'hooks/useAuth'
import AuthForgotPasswordSubmit from 'sections/auth/auth-forms/AuthForgotPasswordSubmit'
import AuthWrapper from 'sections/auth/AuthWrapper'

import { ArrowLeftOutlined } from '@ant-design/icons'

// ================================|| CHECK MAIL ||================================ //

const CheckMail = () => {
  const { isLoggedIn } = useAuth()

  return (
    <AuthWrapper>
      <Grid
        container
        spacing={3}>
        <Grid
          item
          xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3">Enter Verification Code</Typography>
            <Typography color="secondary">We send you on mail.</Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}>
          <AuthForgotPasswordSubmit />
        </Grid>
        <Grid item>
          <AnimateButton>
            <Button
              component={Link}
              to={isLoggedIn ? '/auth/login' : '/login'}
              disableElevation
              fullWidth
              size="large"
              type="link"
              color="primary"
              startIcon={<ArrowLeftOutlined />}>
              Go to Sign in
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default CheckMail
