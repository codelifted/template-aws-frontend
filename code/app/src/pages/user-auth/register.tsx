import { Link } from 'react-router-dom'

import { Grid, Stack, Typography } from '@mui/material'

import useAuth from 'hooks/useAuth'
import AuthRegister from 'sections/auth/auth-forms/AuthRegister'
import AuthWrapper from 'sections/auth/AuthWrapper'

// ================================|| REGISTER ||================================ //

const Register = () => {
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
            <Typography variant="h3">Sign up</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/login' : '/login'}
              variant="body1"
              color="secondary">
              Already have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Register
