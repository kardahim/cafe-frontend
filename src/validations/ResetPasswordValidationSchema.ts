import * as Yup from "yup"

export const ResetPasswordValidationSchema = Yup.object({
    email: Yup
        .string()
        .required("Email jest wymagany")
        .email("Wprowadź poprawny adres email")
});