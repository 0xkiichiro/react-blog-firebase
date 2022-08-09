import * as Yup from "yup";

export const schema = Yup.object().shape({
  firstName: Yup.string().max(20).required(),
  lastName: Yup.string().max(20).required(),

  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(16)
    .required()
    .matches(/\d+/)
    .matches(/[a-z]+/)
    .matches(/[A-Z]+/)
    .matches(/[!,?{}_><%&$#£+-.]+/),
});

export const schemaLogin = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(16)
    .required()
    .matches(/\d+/)
    .matches(/[a-z]+/)
    .matches(/[A-Z]+/)
    .matches(/[!,?{}_><%&$#£+-.]+/),
});
