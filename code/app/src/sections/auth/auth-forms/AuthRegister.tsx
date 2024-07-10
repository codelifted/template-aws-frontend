import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { LoadingButton, TextField } from 'components'

import { countries } from 'data/countries'
import { Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import useGeoLocation from 'hooks/useGeolocation'
import useScriptRef from 'hooks/useScriptRef'
import { strengthColor, strengthIndicator } from 'utils'
import { emailValidation, passwordValidation } from 'utils/validation'
// third party
import * as Yup from 'yup'

import { StringColorProps } from 'types'

// ============================|| AWS CONGNITO - REGISTER ||============================ //

const AuthRegister = () => {
  const { register } = useAuth()
  const scriptedRef = useScriptRef()
  const navigate = useNavigate()

  const form = useRef<HTMLFormElement>(null)

  const location = useGeoLocation()

  const [level, setLevel] = useState<StringColorProps>()

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  useEffect(() => {
    changePassword('')
  }, [])

  if (location.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: '',
          code:
            countries.find(el => el.code === location.country)?.phone || '376',
          phone: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          fullname: Yup.string().max(255).required('Name is required'),
          email: emailValidation,
          phone: Yup.string().max(14).required('Phone is required'),
          password: passwordValidation,
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await register(
              values.email,
              values.password,
              `+${values.code}${values.phone}`,
              values.fullname
            )
            if (scriptedRef.current) {
              setStatus({ success: true })
              setSubmitting(false)
              setTimeout(() => {
                navigate('/code-verification', { replace: true })
              }, 1500)
            }
          } catch (err: any) {
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
            ref={form}
            noValidate
            onSubmit={handleSubmit}>
            <Grid
              container
              spacing={1}>
              <Grid
                item
                xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="fullname-signup">Name*</InputLabel>
                  <TextField
                    id="fullname-login"
                    type="fullname"
                    value={values.fullname}
                    name="fullname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.fullname && errors.fullname)}
                  />
                  {touched.fullname && errors.fullname && (
                    <FormHelperText
                      error
                      id="helper-text-firstname-signup">
                      {errors.fullname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <TextField
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="phone">Phone Number</InputLabel>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    <Select
                      error={Boolean(touched.email && errors.email)}
                      id="code"
                      value={values.code}
                      name="code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      renderValue={value => `${value}`}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: '300px',
                            width: '250px',
                          },
                        },
                      }}>
                      {countries.map(el => (
                        <MenuItem
                          key={el.code}
                          value={el.phone}
                          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                          {el.code && (
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${el.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${el.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                          )}
                          {el.label}
                          {el.code && `(${el.code}) ${el.phone}`}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      fullWidth
                      error={Boolean(touched.phone && errors.phone)}
                      id="phone"
                      type="phone"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Contact Number"
                      inputProps={{}}
                    />
                  </Stack>
                  {touched.phone && errors.phone && (
                    <FormHelperText
                      error
                      id="helper-text-email-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password</InputLabel>
                  <TextField
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type="password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={e => {
                      handleChange(e)
                      changePassword(e.target.value)
                    }}
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl
                  fullWidth
                  sx={{ mt: 2 }}>
                  <Grid
                    container
                    spacing={1}
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
                <Typography variant="body2">
                  <Link
                    variant="subtitle2"
                    href="https://www.insertyoursite.com/terms-and-conditions"
                    target="_blank">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link
                    variant="subtitle2"
                    href="https://www.insertyoursite.com/privacy-policy"
                    target="_blank">
                    Privacy Policy
                  </Link>
                </Typography>
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
                <LoadingButton
                  sx={{ mt: 2 }}
                  loading={isSubmitting}
                  variant="contained"
                  size="large"
                  type="submit"
                  color="secondary">
                  Create Account
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default AuthRegister
