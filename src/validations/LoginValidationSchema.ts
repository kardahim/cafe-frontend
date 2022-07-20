import * as Yup from "yup"

export const LoginValidationSchema = Yup.object({
    email: Yup
        .string()
        .required("Email jest wymagany"),
    password: Yup
        .string()
        .required("Hasło jest wymagane")
});