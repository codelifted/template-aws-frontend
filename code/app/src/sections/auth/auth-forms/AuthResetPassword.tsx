import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  FormControl,
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
import { strengthColor, strengthIndicator } from 'utils'
import { passwordValidation } from 'utils/validation'
// third party
import * as Yup from 'yup'

import { StringColorProps } from 'types'

// ============================|| STATIC - RESET PASSWORD ||============================ //

const AuthResetPassword = () => {
  const scriptedRef = useScriptRef()
  const navigate = useNavigate()

  const { isLoggedIn } = useAuth()

  const [level, setLevel] = useState<StringColorProps>()

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  useEffect(() => {
    changePassword('')
  }, [])

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: passwordValidation,
          confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .when('password', {
              is: (val: string) => !!(val && val.length > 0),
              then: Yup.string().oneOf(
                [Yup.ref('password')],
                'Both Password must be match!'
              ),
            }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // password reset
            if (scriptedRef.current) {
              setStatus({ success: true })
              setSubmitting(false)

              setTimeout(() => {
                navigate(isLoggedIn ? '/auth/login' : '/login', {
                  replace: true,
                })
              }, 1500)
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
                  <InputLabel htmlFor="password-reset">Password</InputLabel>
                  <TextField
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-reset"
                    type="password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={e => {
                      handleChange(e)
                      changePassword(e.target.value)
                    }}
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="helper-text-password-reset">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl
                  fullWidth
                  sx={{ mt: 2 }}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center">
                    <Grid item>
                      <Box
                        sx={{
                          bgcolor: level?.color,
                          width: 85,
                          height: 8,
                          borderRadius: '7px',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirm-password-reset">
                    Confirm Password
                  </InputLabel>
                  <TextField
                    fullWidth
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    id="confirm-password-reset"
                    type="password"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter confirm password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText
                      error
                      id="helper-text-confirm-password-reset">
                      {errors.confirmPassword}
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
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary">
                    Reset Password
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

export default AuthResetPassword
