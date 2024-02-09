import * as yup from "yup";

export const characterCaseRegex = /(?=.*[a-z])(?=.*[A-Z])\w+/;
export const numberRegex = /\d/;
export const speccialCharcterRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

// common schemas
export const nameSchema = yup
  .string()
  .min(4, "name is too short.")
  .required("This field is required.");

export const workMailSchema = yup
  .string()
  .email("Work email must be valid.")
  .required("This field is required.");

export const passwordSchema = yup
  .string()
  .required("This field is required.")
  .min(4, "Password must be 8 or more characters.")
  .matches(
    characterCaseRegex,
    "Password must contain at least one uppercase and lowercase character.",
  )
  .matches(numberRegex, "Password must contain at least one number.")
  .matches(
    speccialCharcterRegex,
    "Password must contain at least one special character.",
  );

export const stringSchema = yup.string().required("This field is required");

// type TFileSupported = {
//   image: Array<string>;
// };

// const validFileExtensions: TFileSupported = {
//   image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
// };

// function isValidFile(file: File, fileType: keyof TFileSupported) {
//   if (file) {
//     const ext = file.name.split(".").join("")[1];
//     return validFileExtensions[fileType].indexOf(ext) > -1;
//   }
// }

// Schema validators
export const regValidationSchema = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  email: workMailSchema,
  password: passwordSchema,
  invitationCode: yup.string().optional(),
  terms: yup.boolean(),
});

export const loginValidationSchema = yup.object().shape({
  email: workMailSchema,
  password: yup
    .string()
    .min(8, "Password must be 8 or more characters.")
    .required("This field is required."),
});

export const forgotPwdValidationSchema = yup.object().shape({
  email: workMailSchema,
});

export const pwdResetSchema = yup.object().shape({
  password: passwordSchema,
});

export const newWorkspaceValidationSchema = yup.object().shape({
  workspaceName: stringSchema,
  position: stringSchema,
  // workspaceLogo: stringSchema,
  workspaceDesc: stringSchema,
  organizationSize: stringSchema,
  industry: stringSchema,
  officeAddress: stringSchema,
  country: stringSchema,
  state: stringSchema,
  website: stringSchema,
});
export const newRequestSchema = yup.object().shape({
  // profileType: stringSchema,
  organizationName: stringSchema,
  executiveName: yup.string(),
  profileDesc: stringSchema,
  position: yup.string(),
  profileDoc: yup.string(),
  imageDesc: yup.string(),
  link: yup.string(),
});

export const updateProfileValidationSchema = yup.object().shape({
  // avatar: yup
  //   .mixed<File>()
  //   .test("fileSize", "Avatar musn't exceed 1mb in size.", (file) => {
  //     file && isValidFile(file, "image");
  //   })
  //   .required("This field is required."),
  avatar: yup.string().required("This field is required."),
  firstName: yup
    .string()
    .min(4, "name is too short.")
    .required("This field is required."),
  lastName: yup
    .string()
    .min(4, "name is too short.")
    .required("This field is required."),
  email: yup
    .string()
    .email("Work email must be valid.")
    .required("This field is required."),
  position: yup.string(),
});

// types
export type TRegistration = yup.InferType<typeof regValidationSchema>;
export type TLogin = yup.InferType<typeof loginValidationSchema>;
export type TForgotPwd = yup.InferType<typeof forgotPwdValidationSchema>;
export type TPwdReset = yup.InferType<typeof pwdResetSchema>;
export type TNewWorkspace = yup.InferType<typeof newWorkspaceValidationSchema>;
export type TUpdateProfile = yup.InferType<
  typeof updateProfileValidationSchema
>;
export type TNewRequest = yup.InferType<typeof newRequestSchema>;
