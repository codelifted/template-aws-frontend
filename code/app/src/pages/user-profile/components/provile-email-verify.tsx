import {
  Box,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material'
import { LoadingButton } from 'components'

import { Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import * as Yup from 'yup'

const EmailVerification = () => {
  const { user, verifyEmail } = useAuth()

  if (user?.attributes?.email_verified) {
    return <></>
  }

  return (
    <>
      <CardHeader title="Email Verification" />
      <Divider />
      <Box>
        <Formik
          initialValues={{
            code: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string().max(6).required('Verification code is required'),
          })}
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            try {
              verifyEmail(values.code)
              setStatus({ success: false })
              setSubmitting(false)
            } catch (err: any) {
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
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
              <Box sx={{ p: 2.5 }}>
                <Grid
                  container
                  spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="code">Verification Code</InputLabel>
                      <TextField
                        fullWidth
                        id="code"
                        value={values.code}
                        name="code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Code"
                        autoFocus
                      />
                      {touched.code && errors.code && (
                        <FormHelperText
                          error
                          id="code-helper">
                          {errors.code}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
                <Stack alignItems="flex-end">
                  <LoadingButton
                    sx={{ mt: 2 }}
                    loading={isSubmitting}
                    disabled={Object.keys(errors).length !== 0}
                    variant="contained"
                    color="secondary"
                    type="submit">
                    Verify
                  </LoadingButton>
                </Stack>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default EmailVerification
