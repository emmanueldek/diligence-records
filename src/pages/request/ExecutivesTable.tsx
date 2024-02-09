import { useNavigate } from "react-router-dom";
import ThreeDotMenu from "@/components/svgs/ThreeDotMenu";
// import DummyImage from "@/assets/images/executive-3.png";
import EmptyIcon from "@/assets/images/empty-state-icon.png";
import { TExecutiveRequestSchema } from "@/types";
import { formatDateString } from "@/utils/format";
import { PrimaryBtn } from "@/components";
import { useState } from "react";
import { useOutsideClick } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "@/config/Toast";
import { deleteRequestById } from "@/services/request";
import Pagination from "@/components/pagination";

type ExecutivesTableProps = {
  data: TExecutiveRequestSchema[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
};
const ExecutivesTable = ({
  data,
  isLoading,
  currentPage,
  setCurrentPage,
  count,
}: ExecutivesTableProps) => {
  const DATASIZE = 10;
  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = useState<{ [key: number]: boolean }>(
    {},
  );
  const optionRef = useOutsideClick(() => setOpenOptions({}));

  const handleTableModalOpen = (rowIndex: number) => {
    setOpenOptions((prevState) => ({
      ...prevState,
      [rowIndex]: true,
    }));
  };
  const queryClient = useQueryClient();
  const { mutate: deleteRequest, isLoading: isDeletingRequest } = useMutation(
    deleteRequestById,
    {
      onError: (error: string) => {
        Toast.error(error);
      },
      onSuccess: (data) => {
        setOpenOptions({});
        Toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["request-executives"] });
      },
    },
  );

  return (
    <>
      <table className="w-full">
        <thead className="border-b border-[#F1F1F2] text-grey-500">
          <th className="font-semibold  px-3 py-4 whitespace-nowrap text-sm text-left md:px-6">
            Executive Name{" "}
          </th>
          <th className="font-semibold  px-3 py-4 whitespace-nowrap text-sm text-left hidden lg:table-cell md:px-6">
            Position{" "}
          </th>
          <th className="font-semibold  px-3 py-4 whitespace-nowrap text-sm text-left hidden sm:table-cell md:px-6">
            Organisation Name
          </th>
          <th className="font-semibold  px-3 py-4 whitespace-nowrap text-sm text-left hidden sm:table-cell md:px-6">
            Date Requested
          </th>
          <th className="font-semibold  px-3 py-4 whitespace-nowrap text-sm text-left md:px-6">
            Status
          </th>
          <th></th>
        </thead>
        <tbody>
          {isLoading
            ? [1, 2, 3, 4, 5].map((_, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-left md:px-6 ">
                    <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-left hidden md:px-6 lg:table-cell">
                    <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-left hidden sm:table-cell md:px-6 ">
                    <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm "></div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-left  hidden sm:table-cell md:px-6 ">
                    <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-left md:px-6 ">
                    <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                  </td>
                </tr>
              ))
            : data?.length
            ? data?.map((item, index) => (
                <tr
                  key={item?._id}
                  className="cursor-pointer border-b border-[#F1F1F2] py-5 transition duration-200 hover:bg-grey-50/50"
                >
                  <td
                    onClick={() => navigate(`/request/${item?._id}`)}
                    className=" cursor-pointer group px-3 py-4 whitespace-nowrap text-sm text-left md:px-6 "
                  >
                    {" "}
                    <p className="flex gap-2 items-center">
                      {/* <span className="w-6 h-6 min-w-[24px] min-y-[24px] rounded-full overflow-hidden inline-block text-center  ">
                    <img src={DummyImage} alt="" className="object-cover" />
                  </span> */}
                      <span className="w-6 h-6 min-w-[24px] min-y-[24px] rounded-full overflow-hidden  text-center bg-[#F0A400] text-white font-medium inline-flex justify-center items-center">
                        {item?.executiveName?.substring(0, 1)}
                      </span>
                      <span className="group-hover:underline font-semibold text-sm">
                        {item?.executiveName}
                      </span>
                    </p>
                  </td>
                  <td className=" px-3 py-4  text-sm text-left md:max-w-[180px] hidden lg:table-cell md:px-6">
                    {item?.position}
                  </td>
                  <td className=" px-3 py-4  text-sm text-left hidden sm:table-cell md:px-6">
                    {item?.organizationName}
                  </td>
                  <td className=" px-3 py-4 whitespace-nowrap text-sm text-left font-medium hidden sm:table-cell md:px-6">
                    {formatDateString(item?.createdAt)}
                  </td>
                  <td className=" px-3 py-4 whitespace-nowrap text-sm text-left md:px-6">
                    <p
                      className={`flex gap-1 items-center capitalize ${
                        item?.status === "pending"
                          ? "text-[#F0A400]"
                          : item?.status === "declined"
                          ? "text-[#EC2727]"
                          : "text-[#11BB88]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full  ${
                          item?.status === "pending"
                            ? "bg-[#F0A400]"
                            : item?.status === "declined"
                            ? "bg-[#EC2727]"
                            : "bg-[#11BB88]"
                        }`}
                      ></span>
                      <span>{item?.status}</span>
                    </p>
                  </td>
                  <td className=" px-3 py-4 whitespace-nowrap relative text-sm text-left md:px-6">
                    <ThreeDotMenu onClick={() => handleTableModalOpen(index)} />
                    {openOptions[index] && (
                      <div
                        ref={optionRef}
                        className={`absolute bg-white z-10 top-10 -left-full h-fit w-fit  shadow-md transition-all p-1 text-sm
                    
                    `}
                      >
                        <p
                          onClick={() => navigate(`/request/${item?._id}`)}
                          className={`py-2 px-3 border-b border-grey-50 cursor-pointer text-grey-400 hover:text-grey-900 hover:bg-grey-50 `}
                        >
                          View Request
                        </p>
                        <p
                          onClick={() => deleteRequest(item?._id)}
                          className={`py-2 px-3 cursor-pointer text-red-500  hover:bg-grey-50 ${
                            isDeletingRequest && "pointer-events-none"
                          }}`}
                        >
                          Delete request
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <div className="flex justify-center mt-5">
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          dataCount={count}
          dataSize={DATASIZE}
          siblingCount={1}
        />
      </div>
      {!isLoading && !data?.length && (
        <section className="h-full text-center ">
          <img
            src={EmptyIcon}
            alt="no request"
            className="inline-block mb-5 mt-20"
          />
          <div className="mb-5">
            <h3 className="font-bold text-2xl mb-2 md:text-4xl">
              No Request from You Yet
            </h3>
            <p className="text-grey-400 md:text-xl">
              Request for an executive profile and we will find it for you
            </p>
          </div>
          <div className="w-40 mx-auto">
            <PrimaryBtn text="Make a Request" onClick={() => navigate("new")} />
          </div>
        </section>
      )}
    </>
  );
};

export default ExecutivesTable;
