import {
  Container,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Theme } from '@mui/material/styles'

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  )

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}>
        <Typography
          variant="subtitle2"
          color="secondary"
          component="span">
          This site is protected by{' '}
          <Link
            color="primary"
            href="https://insertyoursite.com/privacy-policy"
            target="_blank"
            variant="caption">
            Privacy Policy
          </Link>
        </Typography>

        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={matchDownSM ? 1 : 3}
          textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Link
            href="https://insertyoursite.com/privacy-policy"
            target="_blank"
            variant="caption"
            color="textPrimary">
            Privacy Policy
          </Link>
          <Link
            href="https://insertyoursite.com/terms-and-conditions"
            target="_blank"
            variant="caption"
            color="textPrimary">
            Terms and Conditions
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}

export default AuthFooter
