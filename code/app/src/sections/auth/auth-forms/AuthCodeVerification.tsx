import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { AnimateButton, LoadingButton, TextField } from 'components'

import { Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import useScriptRef from 'hooks/useScriptRef'
// third party
import * as Yup from 'yup'

// ================================|| CHECK MAIL ||================================ //

const AuthCodeVerification = () => {
  const scriptedRef = useScriptRef()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const { confirmEmail, resendCode } = useAuth()

  return (
    <>
      <Formik
        initialValues={{
          code: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().max(8).required('Code is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setLoading(true)
            await confirmEmail(values.code)
            if (scriptedRef.current) {
              setStatus({ success: true })
              setSubmitting(false)
              setTimeout(() => {
                navigate('/', {
                  replace: true,
                })
              }, 2500)
            }
          } catch (err: any) {
            setLoading(false)
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
                  <InputLabel htmlFor="code">Confirmation Code</InputLabel>
                  <TextField
                    fullWidth
                    error={Boolean(touched.code && errors.code)}
                    id="code"
                    type="text"
                    value={values.code}
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter confirmation code"
                  />
                  {touched.code && errors.code && (
                    <FormHelperText
                      error
                      id="helper-text-code">
                      {errors.code}
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
                xs={12}>
                <AnimateButton>
                  <LoadingButton
                    loading={loading}
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary">
                    Confirm Email
                  </LoadingButton>
                </AnimateButton>
              </Grid>
              <Grid
                item
                xs={12}>
                <Typography display="inline">
                  Did not receive the email? <br /> Check your spam filter, or
                  &nbsp;
                </Typography>
                <Link
                  href="#"
                  onClick={resendCode}>
                  Resend code
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthCodeVerification
