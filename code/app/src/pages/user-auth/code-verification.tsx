import { Grid, Stack, Typography } from '@mui/material'

import AuthCodeVerification from 'sections/auth/auth-forms/AuthCodeVerification'
import AuthWrapper from 'sections/auth/AuthWrapper'

// ================================|| CODE VERIFICATION ||================================ //

const CodeVerification = () => (
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
        <AuthCodeVerification />
      </Grid>
    </Grid>
  </AuthWrapper>
)

export default CodeVerification
