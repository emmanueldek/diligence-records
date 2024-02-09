import VerifyEmail from "./VerifyEmail";

export const SignUpVerify = () => {
  return (
    <VerifyEmail
      title="Your Account is ready! Verify Email to Get Started"
      text="Check your inbox for our email. Click 'Verify Email' to complete signup."
    />
  );
};

export const ResetVerify = () => {
  return (
    <VerifyEmail
      title="Check your Email"
      text="Password reset link sent to your email. Click 'Reset Password' to regain access."
      flag="reset"
    />
  );
};
