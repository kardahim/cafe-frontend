import * as Yup from "yup"

export const NewSpecialOfferValidationSchema = Yup.object({
    value: Yup
        .number()
        .typeError("Wymagana jest liczba")
        .required("Wartość jest wymagana")
        .min(5, "Wartość promocji może być z zakresu od 5 do 100")
        .max(100, "Wartość promocji może być z zakresu od 5 do 100"),
    start_date: Yup
        .object()
        .required("Data rozpoczęcia promocji jest wymagana"),
    end_date: Yup
        .object()
        .required("Data zakończenia promocji jest wymagana"),
    ProductId: Yup
        .number()
        .required("Produkt jest wymagany")
});