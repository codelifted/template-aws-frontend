import { Link } from 'react-router-dom'

import { Grid, Stack, Typography } from '@mui/material'

import useAuth from 'hooks/useAuth'
import AuthLogin from 'sections/auth/auth-forms/AuthLogin'
import AuthWrapper from 'sections/auth/AuthWrapper'

// ================================|| LOGIN ||================================ //

const Login = () => {
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
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/register'}
              variant="body1"
              color="secondary">
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Login
