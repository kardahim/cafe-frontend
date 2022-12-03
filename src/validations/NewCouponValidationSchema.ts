import * as Yup from "yup"

export const NewCouponValidationSchema = Yup.object({
    value: Yup
        .number()
        .typeError("Wymagana jest liczba")
        .required("Wartość jest wymagana")
        .min(5, "Wartość promocji może być z zakresu od 5 do 100")
        .max(100, "Wartość promocji może być z zakresu od 5 do 100"),
    pointPrice: Yup
        .number()
        .typeError("Wymagana jest liczba")
        .required("Punkty są wymagany")
        .min(0, "Wartość kuponu nie może być ujemna"),
    ProductId: Yup
        .number()
        .required("Produkt jest wymagany")
});