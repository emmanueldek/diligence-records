import React from "react";
import records_logo from "@/assets/images/records_logo.svg";
import { PrimaryBtn } from "@/components";
import Document from "./Document";
import { useNavigate } from "react-router-dom";

const TermsOfUse: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* =======================Header================================= */}
      <div className="flex-1 md:mx-16 mx-5 overflow-auto pb-10">
        <div className="md:grid md:grid-cols-6 ">
          <div className="flex justify-center md:block col-span-1 col-start-1 mt-4">
            <img src={records_logo} alt="" className="" />
          </div>
          <div className="col-start-2 col-span-4">
            <p className="md:text-[32px] text-[24px] font-[700] text-center">
              Terms of use
            </p>
            <div className="md:mt-[7rem] mt-5">
              <p>Last updated December 01, 2023</p>
            </div>
            <div className="md:mt-7 mt-3">
              <p className="md:text-[24px] text-[20px] font-[700]">
                AGREEMENT TO OUR LEGAL TERMS
              </p>
            </div>
            <div className="mt-5">
              <Document />
            </div>
          </div>
        </div>
      </div>
      {/* =========================== footer ======================== */}
      <div className="py-10 flex items-end w-full  bottom-0 fixed bg-[#F7F7F7] md:px-16 px-5">
        <div className="flex space-x-5 w-full md:justify-end justify-center">
          {/* <PrimaryBtn
            text="Decline"
            className="md:w-[200px] w-full py-2 bg-[#FDE9E9] text-[#D72323] "
          /> */}
          <PrimaryBtn
            text="close"
            className="md:w-[200px] w-full py-2"
            onClick={() => navigate("/auth/signup")}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
