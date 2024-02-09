import React from "react";
import RecordsLetterLogo from "@/components/svgs/RecordsLetterLogo";
import { EnvelopeSimpleOpen } from "@/components/svgs/EnvelopeSimpleOpen";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { EnvelopeSimpleKey } from "@/components/svgs/EnvelopeSimpleKey";
import { Card } from "@/components";

interface IVerifyProps {
  title: string;
  text: string;
  flag?: string;
}

const VerifyEmail: React.FC<IVerifyProps> = ({ title, text, flag }) => {
  const navigate = useNavigate();
  return (
    <div>
      {flag === "reset" ? (
        ""
      ) : (
        <div
          className="p-2 border-2 border-radius-black rounded-xl w-[2.5rem] flex justify-center items-center mb-5 hover:bg-grey-100 hover:border-none active:bg-grey-200"
          onClick={() => navigate("/auth/signup")}
        >
          <BiArrowBack size={20} />
        </div>
      )}
      <Card className="w-full bg-white rounded-md p-6">
        <div className="flex flex-col justify-center items-center mb-4">
          <RecordsLetterLogo />
          <div className="mt-4">
            {flag === "reset" ? <EnvelopeSimpleKey /> : <EnvelopeSimpleOpen />}
          </div>
        </div>

        <div className="text-center">
          <h1 className="font-bold w-full max-w-[400px] mx-auto text-2xl lg:text-4xl leading-[38px] mb-2">
            {title}
          </h1>
          <p className="mt-1 font-light text-grey-300">{text}</p>
        </div>
        <div className="w-full mt-8 flex justify-center">
          <div className="p-3 rounded-md bg-grey-100">
            <p className="text-lg font-[600]">name@organisation.com</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmail;
