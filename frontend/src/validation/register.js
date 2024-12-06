import * as yup from "yup";

const registerSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(6).max(32).required('Passwrod is required'),
    confirm_password: yup.string().required('Confirm Passwrod required').oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default registerSchema;