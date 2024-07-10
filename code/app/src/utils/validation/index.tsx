import * as Yup from 'yup'

export const passwordValidation = Yup.string()
  .max(255)
  .notRequired()
  .min(8, 'Password must have at least 8 characters')
  .matches(/[0-9]/, 'Password must contain at least 1 number')
  .matches(/[a-z]/, 'Password must contain at least 1 lower case letter')
  .matches(/[A-Z]/, 'Password must contain at least 1 upper case letter')

export const emailValidation = Yup.string()
  .email('Must be a valid email')
  .max(255)
  .required('Email is required')
