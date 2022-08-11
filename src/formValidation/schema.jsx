import * as Yup from "yup";

export const schema = Yup.object().shape({
  firstName: Yup.string().max(20).required(),
  lastName: Yup.string().max(20).required(),

  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(16)
    .required()
    .matches(/\d+/, "Your password should contain at least one number.")
    .matches(
      /[a-z]+/,
      "Your password should contain at least one lowercase letter."
    )
    .matches(
      /[A-Z]+/,
      "Your password should contain at least one uppercase letter."
    )
    .matches(
      /[!,?{}_><%&$#£+-.]+/,
      "Your password should contain at least one special character."
    ),
});

export const schemaLogin = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(16)
    .required()
    .matches(/\d+/, "Your password should contain at least one number.")
    .matches(
      /[a-z]+/,
      "Your password should contain at least one lowercase letter."
    )
    .matches(
      /[A-Z]+/,
      "Your password should contain at least one uppercase letter."
    )
    .matches(
      /[!,?{}_><%&$#£+-.]+/,
      "Your password should contain at least one special character."
    ),
});
