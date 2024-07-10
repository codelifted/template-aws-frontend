import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material'
import { LoadingButton, MainCard, TextField } from 'components'

import { Formik } from 'formik'
import useAuth from 'hooks/useAuth'
import { strengthColor, strengthIndicator } from 'utils'
import { passwordValidation } from 'utils/validation'
import * as Yup from 'yup'
import EmailVerification from './components/provile-email-verify'

import { StringColorProps, UserAttributes } from 'types'

import { InfoCircleOutlined } from '@ant-design/icons'

const ProfilePage = () => {
  const { user, changePassword, updateProfile, sendVerifCode } = useAuth()

  const [emailVerify, setEmailVerify] = useState(false)

  const [level, setLevel] = useState<StringColorProps>()

  const enterPassword = (value: string) => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  useEffect(() => {
    enterPassword('')
  }, [])

  return (
    <>
      <Stack
        sx={{ mt: 1, mb: 2.5 }}
        justifyContent="space-between"
        direction="row"
        alignItems="end">
        <Typography variant="h3">Profile</Typography>
        <Stack
          alignItems="center"
          direction="row"
          spacing={0.5}>
          <Typography variant="subtitle2">Update profile info</Typography>
          <InfoCircleOutlined />
        </Stack>
      </Stack>
      <Divider />
      <MainCard
        content={false}
        sx={{ mt: 3 }}>
        <Formik
          initialValues={{
            name: user?.attributes?.name || '',
            email: user?.attributes?.email || '',
            oldPassword: '',
            newPassword: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).notRequired(),
            email: Yup.string()
              .email('Invalid email address.')
              .max(255)
              .notRequired(),
            oldPassword: Yup.string().max(255).notRequired(),
            newPassword: passwordValidation,
          })}
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            try {
              let attributes: UserAttributes = {}
              if (values.name && values.name !== user?.attributes?.name)
                attributes = { ...attributes, name: values.name }
              if (values.email && values.email !== user?.attributes?.email) {
                setEmailVerify(true)
                attributes = { ...attributes, email: values.email }
              }
              Object.keys(attributes).length && updateProfile(attributes)

              if (values.newPassword)
                changePassword(values.oldPassword, values.newPassword)
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
                      <InputLabel htmlFor="personal-name">Name</InputLabel>
                      <TextField
                        fullWidth
                        id="personal-name"
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Name"
                        autoFocus
                      />
                      {touched.name && errors.name && (
                        <FormHelperText
                          error
                          id="personal-first-name-helper">
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="old-password">
                        Old Password
                      </InputLabel>
                      <TextField
                        fullWidth
                        type="password"
                        value={values.oldPassword}
                        name="oldPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="old-password"
                        placeholder="******"
                        autoFocus
                      />
                      {touched.oldPassword && errors.oldPassword && (
                        <FormHelperText
                          error
                          id="old-password-helper">
                          {errors.oldPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="personal-email">
                        Email Address
                      </InputLabel>
                      <TextField
                        type="email"
                        fullWidth
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="personal-email"
                        placeholder="Email Address"
                      />
                      {touched.email && errors.email && (
                        <FormHelperText
                          error
                          id="personal-email-helper">
                          {errors.email}
                        </FormHelperText>
                      )}
                      {!user?.attributes?.email_verified && (
                        <FormHelperText
                          sx={{ display: 'flex', alignItems: 'center' }}
                          error
                          id="email-not-verified">
                          You need to verify email.
                          <Button
                            sx={{
                              fontSize: '1em',
                              textDecoration: 'underline',
                            }}
                            variant="text"
                            size="small"
                            onClick={() => {
                              sendVerifCode()
                              setEmailVerify(true)
                            }}>
                            Send the verification code
                          </Button>
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password">New Password</InputLabel>
                      <TextField
                        fullWidth
                        error={Boolean(
                          touched.newPassword && errors.newPassword
                        )}
                        id="password"
                        type="password"
                        value={values.newPassword}
                        name="newPassword"
                        onBlur={handleBlur}
                        onChange={e => {
                          handleChange(e)
                          enterPassword(e.target.value)
                        }}
                        placeholder="******"
                        autoFocus
                      />
                      {touched.newPassword && errors.newPassword && (
                        <FormHelperText
                          error
                          id="helper-text-password">
                          {errors.newPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                    {values.newPassword !== '' && (
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
                    )}
                  </Grid>
                </Grid>
                <Stack alignItems="flex-end">
                  <LoadingButton
                    sx={{ mt: 3, minWidth: 240 }}
                    loading={isSubmitting}
                    disabled={Object.keys(errors).length !== 0}
                    variant="contained"
                    color="secondary"
                    type="submit">
                    Save Changes
                  </LoadingButton>
                </Stack>
              </Box>
            </form>
          )}
        </Formik>
        {emailVerify && <EmailVerification />}
      </MainCard>
    </>
  )
}

export default ProfilePage
