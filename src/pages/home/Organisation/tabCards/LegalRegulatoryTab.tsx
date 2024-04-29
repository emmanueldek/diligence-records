import Loader from "@/components/Loader";
import { TColumn, TOrgLegalRegulatory } from "@/types/organizationTypes";
// import { PrimaryBtn } from "@/components";
import { RECORDS_URLS } from "@/utils/backendURLs";
import { useState } from "react";
import toast from "react-hot-toast";

type TProps = {
  data?: TOrgLegalRegulatory[];
};

const columns: TColumn[] = [
  { field: "year", header: "Year" },
  { field: "fillingStatus", header: "Filing Status" },
  { field: "totalTaxLiability", header: "Litigation Description" },
  { field: "lgrDocuments", header: "Attachment" },
];

const LegalRegulatoryTab: React.FC<TProps> = ({ data }) => {
  const userAuth = localStorage.getItem("authToken") as string;
  const [loading, setLoading] = useState(false);

  const downloadPdf = async (fileName: string | undefined) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${RECORDS_URLS.BASE_URL}${RECORDS_URLS.RETRIEVEPDF}?fileName=${fileName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            Authorization: `Bearer ${userAuth}`,
          },
        },
      );

      if (response.status === 404) {
        setLoading(false);
        toast.error("File not found");
        return;
      }

      const data = await response.blob();
      setLoading(false);
      const hrefUrl = URL.createObjectURL(data);
      window.open(hrefUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="w-full scrollbar-hide overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse border-spacing-0">
          <thead className="text-xs text-grey-400 bg-grey-50">
            <tr className=" h-[45px] px-7 text-left">
              {columns &&
                columns.map((head, i) => (
                  <th key={i} className="pl-4">
                    {head.header}{" "}
                  </th>
                ))}
            </tr>
          </thead>

          <tbody className="w-full divide divide-y divide-grey-50">
            {data &&
              data.map((row, i) => (
                <tr
                  key={i}
                  className="min-h-[40px] text-sm text-[#151515] font-[500]"
                >
                  {columns?.map((col: TColumn, j) => (
                    <td className="pl-4" key={j}>
                      {col.field === "lgrDocuments" ? (
                        <>
                          {row[col.field].map((doc: string, k: number) => (
                            <div className="flex flex-col" key={k}>
                              <p
                                className="text-xs text-[#0029FD] cursor-pointer mb-2"
                                onClick={() => downloadPdf(doc)}
                              >
                                {doc}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <> {row[col.field as keyof TOrgLegalRegulatory]}</>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-6 w-full">
        <div className="w-full">
          <div className="border-b border-grey-50 pb-3">
            <p className="font-bold text-grey-900 text-xl">Documents</p>
          </div>

          <div className="flex flex-wrap gap-4 my-4">
            {data?.map((doc, index) => {
              return (
                <div
                  key={`${index}--doc`}
                  className="w-full sm:w-[190px] md:w-[250px]"
                >
                  <div className="w-full h-[160px] bg-grey-50 rounded-md overflow-hidden group">
                    <button onClick={() => downloadPdf(doc.lgrDocuments)}>
                      <div className="hidden h-full transition-all group-hover:flex justify-center items-center group-hover:bg-grey-200">
                        <PrimaryBtn text="open" />
                      </div>
                    </button>
                  </div>
                  <h4 className="font-bold leading-[20px] mt-3 mb-1 overflow-auto truncate">
                    {doc.lgrDocuments}
                  </h4>
                  <p className="font-light text-grey-400 text-sm leading-[20px]"></p>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
      {loading && <Loader detail="Fetching Record..." />}
    </div>
  );
};

export default LegalRegulatoryTab;
