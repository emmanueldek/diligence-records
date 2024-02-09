import { useNavigate, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { getRequestByID } from "@/services/request";
import { useQuery } from "@tanstack/react-query";

const RequestDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["request-single", id],
    () => getRequestByID(id),
    {
      enabled: !!id,
    },
  );
  console.log("data?.data?.profileType?", data);

  return (
    <main className="relative pb-6 text-grey-900 sm:bg-white sm:min-h-screen sm:px-6 sm:pt-6 sm:pb-10 md:px-10">
      <p
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-5 cursor-pointer"
      >
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8132 6.99987C15.8132 7.24851 15.7145 7.48697 15.5387 7.66278C15.3628 7.8386 15.1244 7.93737 14.8757 7.93737H3.39136L7.41636 11.9616C7.59248 12.1377 7.69143 12.3766 7.69143 12.6257C7.69143 12.8747 7.59248 13.1136 7.41636 13.2897C7.24024 13.4658 7.00137 13.5648 6.7523 13.5648C6.50323 13.5648 6.26436 13.4658 6.08824 13.2897L0.463239 7.66471C0.375839 7.57762 0.306492 7.47412 0.259175 7.36017C0.211857 7.24621 0.1875 7.12404 0.1875 7.00065C0.1875 6.87726 0.211857 6.75509 0.259175 6.64113C0.306492 6.52718 0.375839 6.42368 0.463239 6.33659L6.08824 0.711587C6.17544 0.624381 6.27897 0.555205 6.39291 0.50801C6.50685 0.460814 6.62897 0.436523 6.7523 0.436523C6.87563 0.436523 6.99775 0.460814 7.11169 0.50801C7.22563 0.555205 7.32916 0.624381 7.41636 0.711587C7.50357 0.798793 7.57275 0.902321 7.61994 1.01626C7.66714 1.1302 7.69143 1.25232 7.69143 1.37565C7.69143 1.49898 7.66714 1.6211 7.61994 1.73504C7.57275 1.84898 7.50357 1.95251 7.41636 2.03971L3.39136 6.06237H14.8757C15.1244 6.06237 15.3628 6.16114 15.5387 6.33696C15.7145 6.51277 15.8132 6.75123 15.8132 6.99987Z"
            fill="#5D5F66"
          />
        </svg>

        <span onClick={() => navigate(-1)} className="text-grey-400">
          Back{" "}
        </span>
      </p>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-grey-900 font-bold text-xl md:text-2xl ">
          <span className="capitalize">
            {" "}
            {data?.data?.theRequest?.profileType === "executive"
              ? "Executive"
              : data?.data?.theRequest?.profileType === "organization"
              ? "Organisation"
              : "Records"}
          </span>{" "}
          Request{" "}
        </h1>
        <p
          className={`inline-flex gap-1 items-center px-4 py-1 rounded-md ${
            data?.data?.theRequest?.status === "declined"
              ? "text-red-500 bg-red-50"
              : data?.data?.theRequest?.status === "accepted"
              ? "text-green-500 bg-green-50"
              : "text-[#F0A400] bg-[#FEF6E6]"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              data?.data?.theRequest?.status === "declined"
                ? " bg-red-500"
                : data?.data?.theRequest?.status === "accepted"
                ? " bg-green-500"
                : "bg-[#F0A400]"
            }`}
          ></span>
          <span>
            {data?.data?.theRequest?.status === "declined"
              ? "Declined"
              : data?.data?.theRequest?.status === "accepted"
              ? "Granted"
              : "Pending"}
          </span>
        </p>
      </div>
      {isLoading ? null : data?.data?.theRequest?.status === "declined" ? (
        <div className=" rounded-xl bg-red-50 mb-5 p-4 sm:p-6 md:p-9 border-t border-l border-r-4 border-b-4 border-[#F9BCBC]">
          <p className=" font-bold mb-2 text-red-500 md:text-xl">
            Decline Reason
          </p>
          <p className="text-grey-900">
            {data?.data?.theRequest?.declineReason?.description}
          </p>
        </div>
      ) : data?.data?.theRequest?.status === "accepted" ? (
        <div className=" rounded-xl mb-10  flex items-center justify-between font-semibold sm:p-6 sm:mb-6 md:p-9 md:border-t md:border-l md:border-r-4 md:border-b-4 md:border-[#F2F2F2]">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 min-h-[56px] min-w-[56px] md:h-16 md:w-16 md:min-h-[64px] md:min-w-[64px] overflow-hidden rounded-lg">
              <img
                // src={data?.data?.organizationLogo}
                src={
                  data?.data?.theRequest?.profileType === "executive" ||
                  data?.data?.theRequest?.profileType === "addRecordToExecutive"
                    ? data?.data?.executiveAvatar
                    : data?.data?.organizationLogo
                }
                alt=""
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold md:text-2xl">
                {data?.data?.theRequest?.profileType === "executive" ||
                data?.data?.theRequest?.profileType === "addRecordToExecutive"
                  ? data?.data?.executiveName
                  : data?.data?.organizationName}
              </p>
              <p className="text-sm text-grey-500 flex flex-col md:items-center md:flex-row">
                <span className="whitespace-nowrap capitalize ">
                  {data?.data?.theRequest?.profileType === "executive" ||
                  data?.data?.theRequest?.profileType === "addRecordToExecutive"
                    ? data?.data?.executivePosition
                    : data?.data?.industry}
                </span>
                <BsDot className="text-xl hidden md:inline-block" />
                <span className="whitespace-nowrap capitalize ">
                  {data?.data?.location}
                </span>
              </p>
            </div>
          </div>
          <p
            onClick={() =>
              data?.data?.theRequest?.profileType === "executive" ||
              data?.data?.theRequest?.profileType === "addRecordToExecutive"
                ? navigate(`/home/executive/${data?.data?.executiveId}`)
                : navigate(`/home/organisation/${data?.data?.organizationId}`)
            }
            className="inline text-[#2F80ED] text-sm cursor-pointer sm:text-base"
          >
            View Profile
          </p>
        </div>
      ) : null}
      <section className=" rounded-xl md:p-9 md:border-t md:border-l md:border-r-4 md:border-b-4 md:border-[#F2F2F2]">
        {data?.data?.theRequest?.profileType === "executive" ||
        data?.data?.theRequest?.profileType === "addRecordToExecutive" ? (
          <div className="text-grey-900 md:text-lg">
            <p className=" font-bold mb-2">Executive Name</p>
            <p>{data?.data?.theRequest?.executiveName}</p>
          </div>
        ) : (
          <div className="text-grey-900 md:text-lg">
            <p className=" font-bold mb-2">Organisation Name</p>
            <p>{data?.data?.theRequest?.organizationName} </p>
          </div>
        )}
        <span className="my-6 w-full inline-block border border-grey-50"></span>
        <div className="text-grey-900 md:text-lg">
          <p className=" font-bold mb-2">Description</p>
          <p className="md:w-4/6">
            {data?.data?.theRequest?.profileType === "executive"
              ? data?.data?.theRequest?.executiveDesc
              : data?.data?.theRequest?.profileType === "organization"
              ? data?.data?.theRequest?.organizationDesc
              : data?.data?.theRequest?.recordDocDescription}
          </p>
        </div>
        <span className="my-6 w-full inline-block border border-grey-50"></span>
        <div className="text-grey-900 md:text-lg">
          <p className=" font-bold mb-2">Supporting Document</p>
          <div className="w-full h-36 rounded-lg bg-grey-50 flex justify-center items-center sm:w-64">
            <button className="border-none outline-none w-16 h-7 text-center text-white font-semibold bg-grey-900 rounded-full text-sm">
              {" "}
              Open
            </button>
          </div>
        </div>
        <p className="font-medium mt-1 md:text-lg">Profile Document</p>
        <span className="my-6 w-full inline-block border border-grey-50"></span>
        <div className="text-grey-900 md:text-lg">
          <p className=" font-bold mb-2">Helpful Link</p>
          <a
            href={data?.data?.theRequest?.link}
            target="_black"
            rel="noopener"
            className=""
          >
            {data?.data?.theRequest?.link}
          </a>
        </div>
      </section>
    </main>
  );
};

export default RequestDetails;
