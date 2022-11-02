import * as Yup from "yup"

export const NewOrderValidationSchema = Yup.object({
    phoneNumber: Yup
        .string()
        .matches(/^[1-9][0-9]{8}$/, "Wpisz poprawny numer telefonu"),
    tableId: Yup
        .number()
        .required("Numer stolika jest wymagany"),
});