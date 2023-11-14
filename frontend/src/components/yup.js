import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;
const phoneRegExp = /^(?!.*(\d)\1{9})^(\([0-9]{2,3}\)[ \-]*)?([0-9]{2,4}[ \-]*)*?[0-9]{3,4}[ \-]*[0-9]{3,4}$/;
const pincodeRegExp = /^(?!.*(\d)\1{5})^(\([0-9]{2,3}\)[ \-]*)?([0-9]{2,4}[ \-]*)*?[0-9]{3,4}[ \-]*[0-9]{3,4}$/;
const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/avif',]



export const signupSchema = yup.object().shape({
  name: yup.string().max(30).test(
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
  //   .test(
  //     "valid-image",
  //     "The uploaded file is not a valid image",
  //     async (file) => {
  
  //         if (!file) return true;
  //         console.log(file.buffer);
  //         const result = await validateBufferMIMEType(file.buffer,
  //             {
  //                 allowMimeTypes: ["image/png", "image/jpeg"]
  //             });

  //         return result.ok;
  //     }
  // )
    
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
  .test('offerPrice', 'Offer Price must be less than Price', function (value) {
    const price = this.parent.price; 
    if (value && price && value > price) {
      return false; 
    }
    return true; 
  })
  .required('Offer Price is required'),

  category: yup.string().max(30).required('Required'),
  description: yup.string().max(200)
  .test(
    'no-leading-unusual-spaces',
    'should not have unusual spaces at the beginning',
    (value) => {
      if (typeof value === 'string') {
        
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

});

export const AddCategorySchema = yup.object().shape({
  name: yup.string().max(30)
    .test(
      'no-leading-unusual-spaces',
      'Name should not have unusual spaces at the beginning',
      (value) => {
        if (typeof value === 'string') {
          return !value.match(/^\s/);
        }
        return true; 
      }
    )
    .required('Category Name is required'),
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
    .required(),
})

export const AddressSchema = yup.object().shape({
  name: yup.string().max(30)
    .test(
      'no-leading-unusual-spaces',
      'Name should not have unusual spaces at the beginning',
      (value) => {
        if (typeof value === 'string') {
          return !value.match(/^\s/);
        }
        return true; 
      }
    )
    .required('Name is required'),
  
  phone: yup.string()
    .matches(phoneRegExp, { message: 'Phone number is not Valid.' })
    .min(10, 'Enter a valid Phone Number')
    .required('Required'),  
  
  pincode: yup.string()
    .length(6)
    .matches(pincodeRegExp, { message: 'Please enter a valid pincode' })
    .matches(/^[0-9]{6}/, 'please enter a valid pincode')
    .required(),
  
  address: yup.string()
  .max(100)
  .test(
    'no-leading-unusual-spaces',
    'address should not have unusual spaces at the beginning',
    (value) => {
      if (typeof value === 'string') {
        return !value.match(/^\s/);
      }
      return true; 
    }
  )
  .required(),

  location: yup.string()
    .required(),
  district: yup.string()
    .required(),
  state: yup.string()
    .required(),
});

export const resetPasswordSchema = yup.object().shape({
  current: yup.string().required(),
  newPassword: yup.string()
    .min(8)
    .matches(passwordRules, { message: 'Requires a combination of uppercase and lowercase letters.' })
    .matches(passwordNumberRule, { message: 'At least one number (0-9).' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Password must match')
    .required('Required'),
});

//------------------profile edit ----------------------------

export const editProfileSchema = yup.object().shape({
  name: yup.string().max(30)
  .test(
    'no-leading-unusual-spaces',
    'Name should not have unusual spaces at the beginning',
    (value) => {
      if (typeof value === 'string') {
        return !value.match(/^\s/);
      }
      return true; 
    }
  )
  .required('Name is required'),
  phone: yup.string()
    .matches(phoneRegExp, { message: 'Phone number is not Valid.' })
    .min(10, 'Enter a valid Phone Number')
    .required('Required'),  
  
});

//-------------------coupon-----------------------------------

export const couponSchema = yup.object().shape({
  couponCode: yup.string().max(30)
  .test(
    'no-leading-unusual-spaces',
    'Name should not have unusual spaces at the beginning',
    (value) => {
      if (typeof value === 'string') {
        return !value.match(/^\s/);
      }
      return true; 
    }
  )
  .required('Name is required'),
  percentage: yup.number()
  .min(1, 'Percentage must be greater than or equal to 1')
  .max(100, 'Percentage must be less than or equal to 100')
  .required(),
  // startDate: yup.date().min(new Date(), 'Start date must be after or equal to today').required('Start date is required'),
  // expiry: yup.date().min(yup.ref('startDate'), 'Expiry date must be after the start date')
  // .required('End date is required'),
  minRate: yup.number()
  .positive('Price must be a positive number') 
  .required('Price is required'),
  maxRate: yup.number()
  .moreThan(yup.ref('minRate'), 'Max price must be greater than min price')
  .required('Maximum rate id required'),
})
