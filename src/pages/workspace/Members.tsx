import { SetStateAction, useState, useEffect } from "react";
import { PrimaryBtn } from "@/components";
import { GoPlus, GoKebabHorizontal } from "react-icons/go";
import { useOutsideClick } from "@/hooks";
import { TInviteType, TWorkspaceMembersSchema } from "@/types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getAllMembers,
  makeAdmin,
  makeMember,
  removeUser,
} from "@/services/workspace";
import Toast from "@/config/Toast";
import useDebounce from "@/hooks/useDebounce";
import { currentUser } from "@/services/auth";
import { TUserResponseSchema } from "@/types";

interface IMembersProps {
  openInviteModal: boolean;
  setOpenInviteModal: React.Dispatch<SetStateAction<boolean>>;
  setInvitationType: React.Dispatch<SetStateAction<TInviteType>>;
}

function Members({
  openInviteModal,
  setOpenInviteModal,
  setInvitationType,
}: IMembersProps) {
  const queryClient = useQueryClient();
  const [openInvite, setOpenInviteMember] = useState(false);
  const [user, setUser] = useState<TUserResponseSchema>();
  const { data: userData } = useQuery(["currentUser"], currentUser);
  const [batch] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  // const inviteRef = useOutsideClick(() => setOpenInviteMember(false));
  const handleInviteClick = (inviteType: TInviteType) => {
    setOpenInviteMember(!openInvite);
    setOpenInviteModal(!openInviteModal);
    setInvitationType(inviteType);
  };
  const [actionId, setActionId] = useState<number | null>(null);
  const [showAction, setShowAction] = useState<boolean>(false);

  const handleSetActiionId = (id: number) => {
    if (id === actionId) {
      setActionId(null);
    } else {
      setShowAction(!showAction);
      setActionId(id);
    }
  };

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  useEffect(() => {
    if (showAction === false) {
      setActionId(null);
    }
  }, [showAction]);

  console.log(showAction);

  const modalRef = useOutsideClick(() => {
    // Close the modal when clicking outside
    setShowAction(false);
  });

  const userName = user?.firstName + " " + user?.lastName || " ";

  const { data: workspaceData, isLoading } = useQuery(
    ["workspace-member", batch, debouncedSearch],
    () => getAllMembers(batch, debouncedSearch),
  );

  // changing role to member
  const { mutate: mutateToMember } = useMutation(makeMember, {
    onError: (error: string) => {
      console.log("error creating request", error);
      Toast.error(error);
    },
    onSuccess: (data) => {
      console.log("suceess creating request", data);

      Toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["workspace-member"] });
    },
  });

  const handleChangeToMember = (id: string) => {
    mutateToMember(id);
    setActionId(null);
  };

  // changing role to admin
  const { mutate: mutateToAdmin, isLoading: isMakingAdmin } = useMutation(
    makeAdmin,
    {
      onError: (error: string) => {
        console.log("error creating request", error);
        Toast.error(error);
      },
      onSuccess: (data) => {
        console.log("suceess creating request", data);

        Toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["workspace-member"] });
      },
    },
  );

  const handleChangeToAdmin = (id: string) => {
    mutateToAdmin(id);
    setActionId(null);
  };

  // removing a member
  const { mutate: removeMember, isLoading: isRemovingMember } = useMutation(
    removeUser,
    {
      onError: (error: string) => {
        console.log("error creating request", error);
        Toast.error(error);
      },
      onSuccess: (data) => {
        console.log("suceess creating request", data);

        Toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["workspace-member"] });
      },
    },
  );

  const handleRemoveMember = (useremail: string) => {
    removeMember(useremail);
    setActionId(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center px-4 pb-4">
        <h2 className="mb-4 md:mb-0 font-bold text-xl">
          Members ({workspaceData?.data?.count})
        </h2>

        <div className="flex flex-col md:flex-row md:items-center">
          <input
            id="members_search"
            name="members_search"
            placeholder="Search"
            className="mb-2 md:mb-0 ring-1 ring-grey-50 bg-grey-50 rounded-md p-1.5 outline-0 focus:ring-grey-100 text-sm placeholder:font-light placeholder:text-grey-400"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <span className="hidden md:block w-[1px] h-[20px] bg-[#F1F1F2] mx-2"></span>

          <div className="relative w-full">
            <PrimaryBtn
              className="w-full"
              Icon={GoPlus}
              text="Invite Members"
              onClick={() => handleInviteClick("mail")}
            />

            {/* <div
              ref={inviteRef}
              className={`absolute z-10 top-[40px] right-0 w-fit bg-white shadow-md  transition-all p-1 text-sm ${
                openInvite
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 translate-y-[-12px] invisible"
              }`}
            >
              <p
                className="py-2 px-3 border-b border-grey-50 cursor-pointer hover:bg-grey-50"
                onClick={() => handleInviteClick("mail")}
              >
                Via Email
              </p>
              <p
                className="px-3 py-2 cursor-pointer hover:bg-grey-50"
                onClick={() => handleInviteClick("code")}
              >
                Via Code
              </p>
            </div> */}
          </div>
        </div>
      </div>

      <div className="w-full scrollbar-hide overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse border-spacing-0">
          <thead className="text-xs text-grey-400 border-t border-grey-50">
            <tr className="">
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 text-dark-300 font-medium"
              >
                Full name
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 text-dark-300 font-medium"
              >
                Role
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 text-dark-300 font-medium"
              >
                Email address
              </th>

              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 text-dark-300 font-medium"
              >
                Status
              </th>

              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 text-dark-300 font-medium"
              ></th>
            </tr>
          </thead>

          <tbody className="w-full">
            {isLoading
              ? [1, 2, 3, 4, 5].map((_, index) => (
                  <tr key={index}>
                    <td className="p-3 whitespace-nowrap text-sm text-left md:px-6 ">
                      <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                    </td>

                    <td className="p-3 whitespace-nowrap text-sm text-left md:px-6">
                      <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-left md:px-6 ">
                      <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-left md:px-6 ">
                      <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                    </td>
                  </tr>
                ))
              : workspaceData?.data?.result?.map(
                  (item: TWorkspaceMembersSchema, index: number) => {
                    return (
                      <tr
                        key={item?.workspaceId}
                        className="border-t border-grey-50"
                      >
                        <td
                          scope="col"
                          className="text-sm whitespace-nowrap p-6 rounded-l-md text-grey-500 w-[120px]"
                        >
                          <div className="flex items-center">
                            <p className="flex gap-2 items-center">
                              <span className="w-6 h-6 min-w-[24px] min-y-[24px] rounded-full overflow-hidden  text-center bg-[#F0A400] text-white font-medium inline-flex justify-center items-center">
                                {item?.firstName?.substring(0, 1) ?? "N"}
                              </span>
                              <span className="font-semibold text-sm">
                                {item?.firstName ?? "New"}{" "}
                                {item?.lastName ?? item?.role}
                              </span>
                            </p>
                          </div>
                        </td>
                        <td
                          scope="col"
                          className="text-sm whitespace-nowrap p-6 text-dark-300 capitalize"
                        >
                          {item?.role}
                        </td>
                        <td
                          scope="col"
                          className="text-sm whitespace-nowrap p-6 rounded-r-md text-dark-300 w-[180px]"
                        >
                          <p className=" w-[180px] h-[22px] truncate text-ellipsis overflow-hidden">
                            {item?.email}
                          </p>
                        </td>
                        <td
                          scope="col"
                          className="text-sm whitespace-nowrap p-6 text-dark-300"
                        >
                          <p
                            className={`capitalize ${
                              item?.status === "pending" && "text-red-400"
                            } text-green-500`}
                          >
                            {item?.status}
                          </p>
                        </td>

                        <td
                          scope="col"
                          className="text-sm whitespace-nowrap p-6 text-dark-300 relative "
                        >
                          <GoKebabHorizontal
                            onClick={() => handleSetActiionId(index)}
                            className="rotate-90 cursor-pointer text-grey-200 hover:text-grey-900 peer cursor-pointer"
                          />

                          {showAction && (
                            <>
                              {actionId === index && (
                                <>
                                  {userName ===
                                  item.firstName + " " + item.lastName ? (
                                    ""
                                  ) : (
                                    <div
                                      ref={modalRef}
                                      className={`absolute bg-white z-11 -top-5 left-[-90px] h-fit w-fit  shadow-md transition-all p-1 text-sm`}
                                    >
                                      {user?.isSuperAdmin && (
                                        <p
                                          onClick={() =>
                                            handleRemoveMember(item?.email)
                                          }
                                          className={`py-2 px-3 border-b border-grey-50 cursor-pointer text-grey-400 hover:text-grey-900 hover:bg-grey-50 ${
                                            isRemovingMember &&
                                            "pointer-events-none"
                                          }`}
                                        >
                                          Remove User
                                        </p>
                                      )}

                                      {item.role === "admin" ? (
                                        <p
                                          onClick={() =>
                                            handleChangeToMember(item?.userId)
                                          }
                                          className={`py-2 px-3 cursor-pointer text-grey-400 hover:text-grey-900 hover:bg-grey-50 ${
                                            isMakingAdmin &&
                                            "pointer-events-none"
                                          }}`}
                                        >
                                          Make Member
                                        </p>
                                      ) : (
                                        <p
                                          onClick={() =>
                                            handleChangeToAdmin(item?.userId)
                                          }
                                          className={`py-2 px-3 cursor-pointer text-grey-400 hover:text-grey-900 hover:bg-grey-50 ${
                                            isMakingAdmin &&
                                            "pointer-events-none"
                                          }}`}
                                        >
                                          Make Admin
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Members;
