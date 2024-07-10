import { Link } from 'react-router-dom'

import { Grid, Stack, Typography } from '@mui/material'

import useAuth from 'hooks/useAuth'
import AuthForgotPassword from 'sections/auth/auth-forms/AuthForgotPassword'
import AuthWrapper from 'sections/auth/AuthWrapper'

// ================================|| FORGOT PASSWORD ||================================ //

const ForgotPassword = () => {
  const { isLoggedIn } = useAuth()

  return (
    <AuthWrapper>
      <Grid
        container
        spacing={3}>
        <Grid
          item
          xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Forgot Password</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/login' : '/login'}
              variant="body1"
              color="secondary">
              Back to Login
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default ForgotPassword
