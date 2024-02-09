import { useState } from "react";
import { GoCopy } from "react-icons/go";
import {
  InputText,
  SelectInput,
  ModalWrapper,
  PrimaryBtn,
  LoadingBtn,
  TransparentBtn,
} from "@/components";
import { TInviteType } from "@/types";
import { SetStateAction } from "react";
import { GrSubtractCircle } from "react-icons/gr";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { inviteMember } from "@/services/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "@/config/Toast";

interface IInviteProps {
  setInvitationType: React.Dispatch<SetStateAction<TInviteType>>;
  setOpenInviteModal: React.Dispatch<SetStateAction<boolean>>;
}

const EmailInvite = ({
  // setInvitationType,
  setOpenInviteModal,
}: IInviteProps) => {
  const queryClient = useQueryClient();
  const options = [
    { value: "admin", label: "Admin" },
    { value: "member", label: "Member" },
  ];

  type TInvitees = {
    id: string;
    idRole: string;
    email: string;
    role: string;
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validate = (data: Array<TInvitees>) => {
    const error: Array<TInvitees> = [];

    data.map((datum) => {
      if (datum.email === "") {
        error.push({
          id: datum.id,
          idRole: datum.idRole,
          email: "Email is required.",
          role: "",
        });
      } else if (!validateEmail(datum.email)) {
        error.push({
          id: datum.id,
          idRole: datum.idRole,
          email: "Email is invalid.",
          role: "",
        });
      } else {
        error.push({
          id: datum.id,
          idRole: datum.idRole,
          email: "",
          role: "",
        });
      }

      if (datum.role === "") {
        error.push({
          id: datum.id,
          idRole: datum.idRole,
          role: "Role is required.",
          email: "",
        });
      } else {
        error.push({
          id: datum.id,
          idRole: datum.idRole,
          email: "",
          role: "",
        });
      }
    });

    return error;
  };

  const [invitees, setInvitees] = useState([
    {
      id: "invitee_0",
      idRole: "invitee_0_role",
      email: "",
      role: "",
    },
  ]);

  const [inviteesErr, setInviteesErr] = useState<Array<TInvitees>>([]);

  const handleAddEmail = () => {
    const inviteeId = `invitee_${invitees.length}`;
    setInvitees([
      ...invitees,
      { id: inviteeId, idRole: `${inviteeId}_role`, email: "", role: "" },
    ]);
  };

  const handleRemoveEmail = (id: string) => {
    setInvitees(invitees.filter((invitee) => invitee.id !== id));
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    const updatedInvitees = invitees.map((invitee) => {
      if (invitee.id === name) {
        invitee.email = value;
      }

      if (invitee.idRole === name) {
        invitee.role = value;
      }

      return invitee;
    });

    setInvitees(updatedInvitees);
  };

  const { mutate, isLoading } = useMutation(inviteMember, {
    onError: (error: string) => {
      Toast.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-member"] });
      Toast.success("Invitation sent!");
      setOpenInviteModal(false);
    },
  });

  const getError = (id: string) => {
    const res = inviteesErr.filter(
      (inviteeErr) =>
        (inviteeErr.id === id && inviteeErr.email) ||
        (inviteeErr.idRole === id && inviteeErr.role),
    );

    return res;
  };

  const handleSubmit = () => {
    const error = validate(invitees);
    setInviteesErr(error);

    if (
      invitees.filter(
        (invitee) =>
          invitee.email === "" ||
          !validateEmail(invitee.email) ||
          invitee.role === "",
      ).length === 0
    ) {
      const inviteesMailandRole = invitees.map((invitee) => {
        return {
          email: invitee.email,
          role: invitee.role,
        };
      });

      const res = {
        invitees: inviteesMailandRole,
      };

      mutate(res);
    }
  };

  return (
    <div className="w-full sm:p-3 ">
      <div className="w-full border-b border-grey-50 pb-4">
        <h1 className="w-full md:w-[390px] font-bold text-2xl tracking-[-0.48px] mb-1">
          Invite new members
        </h1>
        <p className="w-full md:w-[390px] font-light text-sm text-grey-400 leading-[21.8px]">
          Enter the email and role of the user to invite.
        </p>
      </div>

      <div className="flex flex-col w-full scrollbar-hide py-4 max-h-[300px] overflow-y-scroll">
        {invitees.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border-b border-grey-50 py-3 last:border-none md:flex-row justify-between items-center"
          >
            <InputText
              className="w-full md:w-[68%] mb-6"
              id={`${item.id}`}
              isRequired={true}
              name={`${item.id}`}
              placeholder={"name@gmail.com"}
              label={"Email address"}
              type={"email"}
              error={getError(`${item.id}`)[0]?.email || ""}
              onChange={(e) => handleOnChange(e)}
            />

            <SelectInput
              className="w-full md:w-[28%] mb-6"
              id={`${item.id}_role`}
              label={"Role"}
              isRequired={true}
              options={options}
              name={`${item.id}_role`}
              error={getError(`${item.id}_role`)[0]?.role || ""}
              onChange={(e) => handleOnChange(e)}
            />
            {invitees.length > 1 && (
              <div className="self-center w-fit mb-2">
                <button className="" onClick={() => handleRemoveEmail(item.id)}>
                  <GrSubtractCircle />
                </button>
              </div>
            )}
          </div>
        ))}

        <p
          onClick={handleAddEmail}
          className="w-fit mt-4 md:mt-0 flex items-center cursor-pointer font-semibold hover:text-grey-900 transition-all duration-300"
        >
          <AiOutlinePlusCircle className="mr-1" />
          Add another mail
        </p>
      </div>

      <div className="flex justify-between md:justify-end items-center border-t border-grey-50 pt-6">
        {/* <p
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={() => setInvitationType("code")}
        >
          Use Code
        </p> */}

        <div className="flex">
          <TransparentBtn
            className="md:ml-4 mr-2"
            text="Cancel"
            onClick={() => setOpenInviteModal(false)}
          />
          <LoadingBtn
            isLoading={isLoading}
            text="Send Invite"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const CodeInvite = ({
  setInvitationType,
  setOpenInviteModal,
}: IInviteProps) => {
  return (
    <div className="w-full">
      <div className="w-full border-b border-grey-50 pb-4">
        <h1 className="w-full md:w-[390px] font-bold text-2xl tracking-[-0.48px] mb-1">
          Share Workspace Code
        </h1>
        <p className="w-full md:w-[390px] font-light text-sm text-grey-400 leading-[21.8px]">
          Share your workspace invitation code with your organisation's members
          for easy signup.
        </p>
      </div>

      <div className="flex flex-col w-full p-4 rounded-md border border-dashed border-grey-200 my-8 bg-grey-50">
        <p className="w-full font-light text-sm text-grey-900 text-xl leading-[28px]">
          Hi there! Sign up on Noemdek and join the workspace using the
          Invitation Code below:
        </p>

        <p className="font-bold mt-2 text-xl">NOEM432</p>

        <p className="text-blue-500 flex items-center self-end">
          <GoCopy className="stroke-1 mr-1" />
          Copy text
        </p>
      </div>

      <div className="flex justify-between md:justify-end items-center border-t border-grey-50 pt-6">
        <p
          className="cursor-pointer text-blue-500 hover:underline transition-all duration-300"
          onClick={() => setInvitationType("mail")}
        >
          Use Email
        </p>

        <div className="flex">
          <TransparentBtn
            className="md:ml-4 mr-2"
            text="Cancel"
            onClick={() => setOpenInviteModal(false)}
          />
          <PrimaryBtn text="Send Invite" />
        </div>
      </div>
    </div>
  );
};

interface IInviteMemberModalProps {
  invitationType: TInviteType;
  setOpenInviteModal: React.Dispatch<SetStateAction<boolean>>;
  setInvitationType: React.Dispatch<SetStateAction<TInviteType>>;
}

function InviteMemberModal({
  invitationType,
  setOpenInviteModal,
  setInvitationType,
}: IInviteMemberModalProps) {
  return (
    <ModalWrapper onClose={() => setOpenInviteModal(false)}>
      {invitationType === "mail" && (
        <EmailInvite
          setInvitationType={setInvitationType}
          setOpenInviteModal={setOpenInviteModal}
        />
      )}
      {invitationType === "code" && (
        <CodeInvite
          setInvitationType={setInvitationType}
          setOpenInviteModal={setOpenInviteModal}
        />
      )}
    </ModalWrapper>
  );
}

export default InviteMemberModal;
