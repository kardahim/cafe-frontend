import * as Yup from "yup"

export const EditDataValidationSchema = Yup.object({
    firstname: Yup
        .string()
        .required("Imię jest wymagane"),
    lastname: Yup
        .string()
        .required("Nazwisko jest wymagane"),
    email: Yup
        .string()
        .required("Email jest wymagany")
        .email("Wprowadź poprawny adres email"),
    phone: Yup
        .string()
        .required("Numer telefonu jest wymagany")
        .matches(/^[1-9][0-9]{8}$/, "Wpisz poprawny numer telefonu"),
    password: Yup
        .string()
        .required("Hasło jest wymagane")
});