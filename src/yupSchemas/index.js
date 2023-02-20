import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("錯誤的信箱格式").required("請輸入信箱"),
  password: yup
    .string()
    .min(8, "錯誤的密碼格式")
    .max(12, "錯誤的密碼格式")
    .required("請輸入密碼"),
});
