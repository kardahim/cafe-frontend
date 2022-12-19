import * as Yup from "yup"

export const ChangePasswordValidationSchema = Yup.object({
    password: Yup
        .string()
        .required("Hasło jest wymagane")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Hasło musi zawierać znak specjalny, cyfrę, wielką i małą literę oraz minimum 8 znaków"),
    newPassword: Yup
        .string()
        .required("Hasło jest wymagane")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Hasło musi zawierać znak specjalny, cyfrę, wielką i małą literę oraz minimum 8 znaków"),
});