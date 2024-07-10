import { Link as RouterLink } from 'react-router-dom'

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  Stack,
} from '@mui/material'
import { AnimateButton, TextField } from 'components'

import { Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import useScriptRef from 'hooks/useScriptRef'
import * as Yup from 'yup'

// ============================|| AWS CONNITO - LOGIN ||============================ //

const AuthLogin = () => {
  const { login } = useAuth()

  const scriptedRef = useScriptRef()

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.email, values.password)
            if (scriptedRef.current) {
              setStatus({ success: true })
              setSubmitting(false)
            }
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
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>

                  <TextField
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <TextField
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type="password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="******"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ mt: -1 }}>
                <Link
                  variant="h6"
                  component={RouterLink}
                  to="/forgot-password"
                  color="primary">
                  Forgot Password?
                </Link>
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
                    Login
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

export default AuthLogin
