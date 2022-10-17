import * as Yup from "yup"

export const ResetPasswordConfirmationValidationSchema = Yup.object({
    code: Yup
        .string()
        .required("Kod jest wymagany"),
    // add correct code validation
    password: Yup
        .string()
        .required("Hasło jest wymagane")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Hasło musi zawierać znak specjalny, cyfrę, wielką i małą literę oraz minimum 8 znaków"),
    repeatPassword: Yup
        .string()
        .required("Hasło jest wymagane")
        // check that password and repeatPassword are same
        .oneOf([Yup.ref('password')], "Hasło musi być identyczne")
});