import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import RecordsLetterLogo from "@/components/svgs/RecordsLetterLogo";
import { Card, InputText, LoadingBtn } from "@/components";
import { Back } from "@/components/svgs/Back";
import { useFormik } from "formik";
import {
  TForgotPwd,
  forgotPwdValidationSchema,
} from "@/utils/validationSchemas";
import { forgotPwd } from "@/services/auth";
import Toast from "@/config/Toast";

const initialValues: TForgotPwd = {
  email: "",
};

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(forgotPwd, {
    onError: (error: string) => {
      Toast.error(error);
    },
    onSuccess: (data) => {
      Toast.success(data.message);
    },
  });

  const onSubmit = (data: TForgotPwd) => {
    mutate(data);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: forgotPwdValidationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof TForgotPwd) => {
    return touched[key] && errors[key];
  };

  return (
    <Card className="w-full bg-white rounded-md p-6">
      <div className="flex flex-col justify-center items-center mb-4">
        <RecordsLetterLogo />
      </div>
      <div className="text-center">
        <h1 className="font-[700] text-2xl lg:text-4xl leading-[38px]">
          Forgot Password
        </h1>
        <p className="mt-1 font-light text-grey-300">
          Please provide the registered email address. We'll send you a password
          reset link.
        </p>
      </div>
      <div className="w-full mt-8">
        <form action="" onSubmit={handleSubmit} className="space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <InputText
              label="Email"
              placeholder="e.g name@example.com"
              error={getError("email")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              name="email"
              value={values.email}
            />
          </div>

          <LoadingBtn
            isLoading={isLoading}
            text="Submit"
            type="submit"
            className="w-full h-10"
          />
        </form>
        <div
          className="font-600 text-[#475467] flex justify-center items-center mt-5 cursor-pointer space-x-2"
          onClick={() => navigate("/auth/login")}
        >
          <Back />
          <span className="font-light">Back to log in</span>
        </div>
      </div>
    </Card>
  );
};

export default ForgetPassword;
