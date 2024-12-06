import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
});

export default loginSchema;