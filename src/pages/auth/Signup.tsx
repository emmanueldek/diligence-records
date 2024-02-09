import React from "react";
import { useMutation } from "@tanstack/react-query";
import RecordsLetterLogo from "@/components/svgs/RecordsLetterLogo";
import { Link, useNavigate } from "react-router-dom";
import { Card, InputText, LoadingBtn } from "@/components";
import { useFormik } from "formik";
import { regValidationSchema, TRegistration } from "@/utils/validationSchemas";
import { LinkCheckBox, InputPassword } from "@/components/input";
import { registerUser } from "@/services/auth";
import Toast from "@/config/Toast";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: TRegistration = {
    firstName: "",
    lastName: "",
    email: "",
    invitationCode: "",
    password: "",
    terms: false,
  };

  const { mutate, isLoading } = useMutation(registerUser, {
    onError: (error: { message: string }) => {
      Toast.error(`${error.message}`);
    },
    onSuccess: () => {
      Toast.success("Registration successful!");
      setTimeout(() => navigate("/auth/login"), 1000);
    },
  });

  const onSubmit = (data: TRegistration) => {
    if (values.terms === false) {
      Toast.error("you have not agreed to our terms yet");
    } else mutate(data);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: regValidationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof TRegistration) => {
    return touched[key] && errors[key];
  };
  return (
    <Card className="w-full bg-white rounded-md p-6">
      <div className="flex justify-center items-center mb-4">
        <RecordsLetterLogo />
      </div>
      <div className="text-center">
        <h1 className="font-[700] text-2xl lg:text-4xl leading-[38px]">
          Create Account
        </h1>
        <p className="mt-1 font-light text-grey-300">
          Already have an account?&nbsp;
          <Link
            to="/auth/login"
            className="font-medium text-green-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
      <div className="w-full mt-8">
        <form action="" onSubmit={handleSubmit} className="space-y-1">
          <div className="pb-8">
            <div className="flex flex-col md:flex-row items-center md:justify-between">
              <div className="w-full md:w-[48%]">
                <InputText
                  label="First Name"
                  placeholder="First Name"
                  error={getError("firstName")}
                  type="text"
                  onChange={handleChange}
                  isRequired={true}
                  name="firstName"
                  value={values.firstName}
                />
              </div>

              <div className="w-full md:w-[48%]">
                <InputText
                  label="Last Name"
                  placeholder="Last Name"
                  error={getError("lastName")}
                  type="text"
                  onChange={handleChange}
                  isRequired={true}
                  name="lastName"
                  value={values.lastName}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
              <div className="w-full">
                <InputText
                  label={"Work Email"}
                  placeholder={"Work Email"}
                  error={getError("email")}
                  type="text"
                  onChange={handleChange}
                  isRequired={true}
                  name={"email"}
                  value={values.email}
                />
              </div>

              <div className="w-full md:w-[48%]">
                <InputText
                  label={"Organisation Code"}
                  placeholder="Organisation Code"
                  error={getError("invitationCode")}
                  type="text"
                  onChange={handleChange}
                  name={"invitationCode"}
                  value={values.invitationCode}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-between">
              <InputPassword
                label={"Password"}
                placeholder={"Password"}
                error={getError("password")}
                onChange={handleChange}
                isRequired={true}
                name={"password"}
                value={values.password}
              />
            </div>
            <div className="mt-2">
              <LinkCheckBox
                className="items-center"
                id="terms"
                name="terms"
                text="I agree with the"
                link="/document/terms"
                linkText="Terms and Privacy Policy"
                onChange={handleChange}
              />
            </div>
          </div>
          <LoadingBtn
            isLoading={isLoading}
            text="Create Account"
            type="submit"
            className="w-full h-10"
          />
        </form>
      </div>
    </Card>
  );
};

export default Signup;
