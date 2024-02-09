import { useState } from "react";
import { Wrapper } from "@/components";
import Members from "./Members";
import Profile from "./Profile";
import InviteMemberModal from "./InviteMemberModal";
import { TInviteType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/workspace";

const manageData = [
  {
    id: 0,
    name: "Profile",
  },
  {
    id: 0,
    name: "Members",
  },
];

function Workspace() {
  const [tab, setTab] = useState("Profile");
  const [invitationType, setInvitationType] = useState<TInviteType>("mail");
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { data } = useQuery(["workspace-profile"], getProfile);
  return (
    <main className="flex flex-wrap items-start gap-4">
      <Wrapper className="bg-white w-full md:w-[230px] px-0">
        <h2 className="font-bold text-xl mx-4 border-b border-grey-50 pb-3">
          Manage Workspace
        </h2>

        <div className="mx-4 my-4">
          <figure className="w-[48px] h-[48px] overflow-hidden rounded-md mb-2">
            <img
              className="w-full h-full"
              src={data?.data?.theWorkspace?.workspaceLogo}
              alt=""
            />
          </figure>

          <div className="">
            <p className="font-bold text-sm">
              {data?.data?.theWorkspace?.workspaceName}
            </p>
            <p className="text-grey-400 text-[10px] font-medium">
              {data?.data?.membersCount ?? "0"} members
            </p>
          </div>
        </div>

        <div>
          {manageData.map((datum) => {
            const { id, name } = datum;
            return (
              <p
                onClick={() => setTab(name)}
                key={id}
                className={`cursor-pointer text-sm flex justify-start items-center mb-2 last:mb-0 p-2 transition-all duration-150 ${
                  name === tab
                    ? "border-l-2 border-grey-900 bg-grey-50 text-grey-900 font-bold"
                    : "font-light text-grey-400"
                } hover:border-l-2 hover:border-grey-900 hover:bg-grey-50 hover:text-grey-900`}
              >
                {name}
              </p>
            );
          })}
        </div>
      </Wrapper>

      <Wrapper className="bg-white w-full max-w-[700px] px-0">
        {tab === "Profile" && <Profile data={data?.data?.theWorkspace} />}
        {tab === "Members" && (
          <Members
            openInviteModal={openInviteModal}
            setOpenInviteModal={setOpenInviteModal}
            setInvitationType={setInvitationType}
          />
        )}
      </Wrapper>

      {openInviteModal && (
        <InviteMemberModal
          invitationType={invitationType}
          setOpenInviteModal={setOpenInviteModal}
          setInvitationType={setInvitationType}
        />
      )}
    </main>
  );
}

export default Workspace;
