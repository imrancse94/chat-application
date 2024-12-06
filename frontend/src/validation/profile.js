import * as yup from "yup";

const profileSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    confirm_password: yup.string().required('Confirm Passwrod required').oneOf([yup.ref('password'), null], `Password doesn't match`)
});

export default profileSchema;