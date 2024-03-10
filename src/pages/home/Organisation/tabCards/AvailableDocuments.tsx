import { PrimaryBtn } from "@/components";
import { TOrgFinancialStatements } from "@/types/organizationTypes";
import { RECORDS_URLS } from "@/utils/backendURLs";

type TProps = {
  data?: TOrgFinancialStatements[];
  type?: string;
};

const AvailableDocuments: React.FC<TProps> = ({ data, type }) => {
  const userAuth = localStorage.getItem("authToken") as string;

  const downloadPdf = async (fileName: string | undefined) => {
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

      const data = await response.blob();
      const hrefUrl = URL.createObjectURL(data);
      window.open(hrefUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
                {type === "pdf" ? (
                  <button onClick={() => downloadPdf(doc.fsDocuments)}>
                    <div className="hidden h-full transition-all group-hover:flex justify-center items-center group-hover:bg-grey-200">
                      <PrimaryBtn text="open" />
                    </div>
                  </button>
                ) : (
                  <a href={doc.fsDocuments} target="_blank">
                    <div className="hidden h-full transition-all group-hover:flex justify-center items-center group-hover:bg-grey-200">
                      <PrimaryBtn text="open" />
                    </div>
                  </a>
                )}
              </div>

              {/* </a> */}

              <h4 className="font-bold leading-[20px] mt-3 mb-1 overflow-auto truncate text-center">
                {doc.year ? doc.year : doc.fsDocuments}
              </h4>
              <p className="font-light text-grey-400 text-sm leading-[20px]">
                {/* {date} */}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableDocuments;
