import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Toast from "@/config/Toast";
import RecordsLetterLogo from "@/components/svgs/RecordsLetterLogo";
import { Link } from "react-router-dom";
import { InputText, Card, LoadingBtn } from "@/components";
import { useFormik } from "formik";
import { InputPassword } from "@/components/input";
import { loginValidationSchema, TLogin } from "@/utils/validationSchemas";
import { loginUser } from "@/services/auth";
import { PATHNAMES } from "@/utils/routes";

const initialValues: TLogin = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(loginUser, {
    onError: (error: string) => {
      Toast.error(error);
    },
    onSuccess: (data) => {
      Toast.success("Login successful!");
      if (!data.workspaceToken) {
        setTimeout(
          () => navigate(`/space/${PATHNAMES.SPACE_PATHS.CREATE}`),
          1000,
        );
      } else {
        setTimeout(() => navigate("/"), 1000);
      }
    },
  });

  const onSubmit = (data: TLogin) => {
    mutate(data);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof TLogin) => {
    return touched[key] && errors[key];
  };

  return (
     <Card className="w-full bg-white rounded-md p-6">
      <div className="flex justify-center items-center mb-4">
        <RecordsLetterLogo />
      </div>
      <div className="text-center">
        <h1 className="font-[700] text-2xl lg:text-4xl leading-[38px]">
          Log in
        </h1>
        
      </div>
      <div className="w-full mt-8">
        <form action="" onSubmit={handleSubmit} className="">
          <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-between">
            <InputPassword
              label="Password"
              placeholder="Password"
              error={getError("password")}
              onChange={handleChange}
              isRequired={true}
              name="password"
              value={values.password}
            />
          </div>

          <div className="font-medium text-grey-900 flex justify-end items-center pb-5">
            <span
              onClick={() =>
                navigate(`/auth/${PATHNAMES.AUTH_PATHS.FORGOT_PASSWORD}`)
              }
              className="cursor-pointer"
            >
              forgot password ?
            </span>
          </div>

          <LoadingBtn
            isLoading={isLoading}
            text="Log in"
            type="submit"
            className="w-full h-10"
          />
        </form>
        <p className="mt-4 font-light text-grey-300">
          Don’t have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-[700] text-green-500 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default Login;
