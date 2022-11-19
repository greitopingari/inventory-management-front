import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().email("Email is required").required("Email is required!"),
    password: yup.string().required("Password is required!"),
});

const registerSchema = yup.object().shape({
    email: yup.string().email("Email is required").required("Email is required!"),
    password: yup.string().required("Password is required!"),
    confirm_password: yup.string().oneOf([yup.ref("password"), null], "Passwords must match!"),
})


export {
    loginSchema,
    registerSchema
};
