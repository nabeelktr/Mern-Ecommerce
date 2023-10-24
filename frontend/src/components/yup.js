import * as yup from 'yup'

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/

export const signupSchema = yup.object().shape({
    name: yup.string().max(30).required("Required"),
    email: yup.string().email('enter a valid email').required("Required"),

    phone: yup.string()
    .min(10,'Enter a valid Phone Number')
    .required("Required"),
    password: yup.string()
    .min(5)
    .matches(passwordRules,{message:'Please create a strong password'})
    .required("Required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'),null],"Password must match")
    .required('Required')
    
})
export const LoginSchema = yup.object().shape({
    email: yup.string().email('enter a valid email').required("Required"),
    password: yup.string()
    .min(5)
    .matches(passwordRules,{message:'Please enter a valid password'})
    .required("Required"),
})