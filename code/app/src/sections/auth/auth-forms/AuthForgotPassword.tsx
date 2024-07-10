import { useNavigate } from 'react-router-dom'

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material'
import { AnimateButton, TextField } from 'components'

import { Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import useScriptRef from 'hooks/useScriptRef'
import { emailValidation } from 'utils/validation'
// third party
import * as Yup from 'yup'

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  const scriptedRef = useScriptRef()
  const navigate = useNavigate()

  const { isLoggedIn, resetPassword } = useAuth()

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: emailValidation,
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await resetPassword(values.email).then(
              () => {
                setStatus({ success: true })
                setSubmitting(false)
                setTimeout(() => {
                  navigate(isLoggedIn ? '/auth/check-mail' : '/check-mail', {
                    replace: true,
                  })
                }, 1500)
              },
              (err: any) => {
                setStatus({ success: false })
                setErrors({ submit: err.message })
                setSubmitting(false)
              }
            )
          } catch (err: any) {
            console.error(err)
            if (scriptedRef.current) {
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
            }
          }
        }}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}>
              <Grid
                item
                xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                  <TextField
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-forgot"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="helper-text-email-forgot">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid
                  item
                  xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sx={{ mb: -2 }}>
                <Typography variant="caption">
                  Do not forgot to check SPAM box.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary">
                    Send Password Reset Email
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthForgotPassword
