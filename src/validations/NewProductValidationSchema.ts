import * as Yup from "yup"

export const NewProductValidationSchema = Yup.object({
    CategoryId: Yup
        .number()
        .required("Kategoria jest wymagana"),
    name: Yup
        .string()
        .required("Nazwa jest wymagana"),
    size: Yup
        .number()
        .typeError("Wymagana jest liczba")
        .required("Rozmiar jest wymagany")
        .min(0, "Gramatura nie może być ujemna"),
    unit: Yup
        .string()
        .required("Wybierz jednostkę")
        .required("Zaznaczenie jest wymagane").oneOf(["g", "ml"]),
    price: Yup
        .number()
        .typeError("Wymagana jest liczba")
        .required("Cena jest wymagana")
        .min(0, "Cena nie może być ujemna"),
    // it should be multi select
    allergen: Yup
        .string(),
    ProductStatusId: Yup
        .number()
        .required("Status jest wymagany")
});

export const NewCategoryValidationSchema = Yup.object({
    name: Yup
        .string()
        .required("Pole jest wymagane")
})