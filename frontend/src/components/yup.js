import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;
const phoneRegExp = /^(?!.*(\d)\1{9})^(\([0-9]{2,3}\)[ \-]*)?([0-9]{2,4}[ \-]*)*?[0-9]{3,4}[ \-]*[0-9]{3,4}$/;
const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/avif',]



export const signupSchema = yup.object().shape({
  name: yup.string().max(30).required('Required'),
  email: yup.string().email('enter a valid email').required('Required'),

  phone: yup.string()
    .matches(phoneRegExp, { message: 'Phone number is not Valid.' })
    .min(10, 'Enter a valid Phone Number')
    .required('Required'),
  password: yup.string()
    .min(8)
    .matches(passwordRules, { message: 'Requires a combination of uppercase and lowercase letters.' })
    .matches(passwordNumberRule, { message: 'At least one number (0-9).' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Required'),

});

export const LoginSchema = yup.object().shape({
  email: yup.string().email('enter a valid email').required('Required'),
  password: yup.string()
    .min(5)
    .matches(passwordRules, { message: 'Please enter a valid password' })
    .required('Required'),
});

export const AddImageSchema = yup.object().shape({
  image: yup.mixed().nullable()
    .test(
      'FILE_SIZE',
      'Uploaded size is too big.',
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      'Uploaded file has unsupported format.',
      (value) => !value || (value && supportedFormats.includes(value?.type))
    )
})

export const AddProductSchema = yup.object().shape({
  name: yup.string().max(30)
  //.transform((value) => (typeof value === 'string' ? value.trim() : value)) // Trim the input string
    .test(
      'no-leading-unusual-spaces',
      'Name should not have unusual spaces at the beginning',
      (value) => {
        if (typeof value === 'string') {
          // Check if the string has unusual spaces at the beginning
          return !value.match(/^\s/);
        }
        return true; 
      }
    )
  .required('Name is required'),
  price: yup.number()
  .positive('Price must be a positive number') 
  .required('Price is required'),
  offerPrice: yup.number()
  .positive('Price must be a positive number') 
  .required('Offer Price is required'),
  category: yup.string().max(30).required('Required'),
  description: yup.string().max(200)
  .test(
    'no-leading-unusual-spaces',
    'should not have unusual spaces at the beginning',
    (value) => {
      if (typeof value === 'string') {
        // Check if the string has unusual spaces at the beginning
        return !value.match(/^\s/);
      }
      return true; 
    }
  )
  .required('Required'),
  color: yup.string().max(30)
  .test(
    'no-leading-unusual-spaces',
    'should not have unusual spaces at the beginning',
    (value) => {
      if (typeof value === 'string') {
        // Check if the string has unusual spaces at the beginning
        return !value.match(/^\s/);
      }
      return true; 
    }
  )
  .required('Required'),
  gender: yup.string().max(30).required('Required'),
  subCategory: yup.string().max(30)
  .test(
    'no-leading-unusual-spaces',
    'should not have unusual spaces at the beginning',
    (value) => {
      if (typeof value === 'string') {
        // Check if the string has unusual spaces at the beginning
        return !value.match(/^\s/);
      }
      return true; 
    }
  )
  .required('Required'),
})

export const variantSchema = yup.object().shape({
  size: yup.number().required('Required'),
  qty: yup.number().required('Required'),

})


