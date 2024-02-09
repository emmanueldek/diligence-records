import React from "react";
import RecordsLetterLogo from "@/components/svgs/RecordsLetterLogo";
import { Card, InputPassword, LoadingBtn } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { pwdReset } from "@/services/auth";
import Toast from "@/config/Toast";

interface IDataProps {
  password: string;
}

const initialValues: IDataProps = {
  password: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Please enter a password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Case Character",
    ),
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = id || "";

  const { mutate, isLoading } = useMutation(pwdReset, {
    onError: (error) => {
      Toast.error(`${error}`);
    },
    onSuccess: () => {
      Toast.success("Account verified!, Redirecting to Login");
      navigate("/auth/login");
    },
  });

  const onSubmit = (data: IDataProps) => {
    const payload = { data, token: token };
    // console.log(payload);
    mutate(payload);
    // navigate("/auth/verify-reset");
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof IDataProps) => {
    return touched[key] && errors[key];
  };

  return (
    <Card className="w-full bg-white rounded-md p-6">
      <div className="flex flex-col justify-center items-center mb-4">
        <RecordsLetterLogo />
      </div>
      <div className="text-center">
        <h1 className="font-[700] text-2xl lg:text-4xl leading-[38px]">
          Create New Password
        </h1>
        <p className="mt-1 font-light text-grey-300">
          Choose a new password distinct from your previous one and easy to
          remember.
        </p>
      </div>
      <div className="w-full mt-8">
        <form action="" onSubmit={handleSubmit} className="space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <InputPassword
              label="New Password"
              placeholder="Enter New Password"
              error={getError("password")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              name="password" // Corrected the name attribute
              value={values.password}
            />
          </div>
          <LoadingBtn
            text="Submit"
            type="submit"
            isLoading={isLoading}
            className="w-full h-10"
          />
        </form>
      </div>
    </Card>
  );
};

export default ResetPassword;
