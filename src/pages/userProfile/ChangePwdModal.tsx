import { SetStateAction } from "react";
import {
  InputPassword,
  ModalWrapper,
  PrimaryBtn,
  TransparentBtn,
} from "@/components";

interface IChangePwdModal {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

function ChangePwdModal({ setOpenModal }: IChangePwdModal) {
  return (
    <ModalWrapper onClose={() => setOpenModal(false)}>
      <div className="w-full">
        <div className="w-full pb-4">
          <h1 className="w-full md:w-[390px] font-bold text-2xl tracking-[-0.48px] mb-1">
            Change Password
          </h1>
          <p className="w-full md:w-[390px] font-light text-sm text-grey-400 leading-[21.8px]">
            Create a new password to secure your account.
          </p>
        </div>

        <InputPassword
          id={"current_password"}
          isRequired={true}
          name={"current_password"}
          placeholder={"current_password"}
          label={"Current Password"}
        />

        <InputPassword
          id={"new_password"}
          isRequired={true}
          name={"new_password"}
          placeholder={"new_password"}
          label={"New Password"}
        />

        <div className="flex justify-between md:justify-end items-center pt-6">
          <div className="flex">
            <TransparentBtn
              className="md:ml-4 mr-2"
              text="Cancel"
              onClick={() => setOpenModal(false)}
            />
            <PrimaryBtn text="Reset password" />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ChangePwdModal;
