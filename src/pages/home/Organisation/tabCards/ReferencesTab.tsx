import { PrimaryBtn } from "@/components";
import { RECORDS_URLS } from "@/utils/backendURLs";

const columns: any[] = [
  { field: "name", header: "Name" },
  { field: "referenceDate", header: "Reference Date" },
  { field: "rrDocuments", header: "" },
  // { field: "expiryDate", header: "Expiry Date" },
];
function ReferencesTab({ data }: any) {
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
    // <div className="w-full scrollbar-hide overflow-x-auto">
    //   <div className="border-b border-grey-50 pb-2 mb-2">
    //     <h4 className="font-bold text-xl mb-3">Record 1</h4>
    //     <div className="mb-2">
    //       <p className="font-bold mb-1">
    //         Client Reference:&nbsp;
    //         <span className="font-light">Acme Corporation</span>
    //       </p>
    //       <p className="font-bold mb-1">
    //         Feedback:&nbsp;
    //         <span className="font-light">
    //           "Reliable supplier, consistently met delivery deadlines."
    //         </span>
    //       </p>
    //       <p className="font-bold">
    //         Date of Feedback:&nbsp;
    //         <span className="font-light">August 10, 2022</span>
    //       </p>
    //     </div>

    //     <div className="px-1 my-4">
    //       <TransparentBtn Icon={GoFile} text="Download Record" />
    //     </div>

    //     <div className="">
    //       <p className="font-bold mb-1">
    //         Link:&nbsp;
    //         <a
    //           href="www.financy.com/898hehe983h"
    //           target="_blank"
    //           className="font-light text-link hover:underline"
    //         >
    //           www.financy.com/898hehe983h
    //         </a>
    //       </p>
    //       <p className="font-bold">
    //         Link:&nbsp;
    //         <a
    //           href="www.financy.com/898hehe983h"
    //           target="_blank"
    //           className="font-light text-link hover:underline"
    //         >
    //           www.financy.com/898hehe983h
    //         </a>
    //       </p>
    //     </div>
    //   </div>

    //   <div className="">
    //     <h4 className="font-bold text-xl mb-3">Record 2</h4>
    //     <div className="mb-2">
    //       <p className="font-bold mb-1">
    //         Partner Reputation:&nbsp;
    //         <span className="font-light">Industry Awards and Recognition</span>
    //       </p>
    //       <p className="font-bold mb-1">
    //         Awards Received:&nbsp;
    //         <span className="font-light">
    //           "Supplier of the Year 2021," "Excellence in Customer Service"
    //         </span>
    //       </p>
    //       <p className="font-bold">
    //         Recognized By:&nbsp;
    //         <span className="font-light">
    //           Industry Associations and Publications
    //         </span>
    //       </p>
    //     </div>

    //     <div className="px-1 my-4">
    //       <TransparentBtn Icon={GoFile} text="Download Record" />
    //     </div>

    //     <div className="">
    //       <p className="font-bold mb-1">
    //         Link:&nbsp;
    //         <a
    //           href="www.financy.com/898hehe983h"
    //           target="_blank"
    //           className="font-light text-link hover:underline"
    //         >
    //           www.financy.com/898hehe983h
    //         </a>
    //       </p>
    //       <p className="font-bold">
    //         Link:&nbsp;
    //         <a
    //           href="www.financy.com/898hehe983h"
    //           target="_blank"
    //           className="font-light text-link hover:underline"
    //         >
    //           www.financy.com/898hehe983h
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
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

          <tbody className="w-full">
            {data &&
              data.map((row: any, i: number) => (
                <tr
                  key={i}
                  className="h-[40px]  text-sm text-[#151515] font-[500]"
                >
                  {columns?.map((col: any, i) => (
                    <td key={i} className="pl-4 font-light text-textGrey">
                      {row[col.field as keyof any]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 w-full">
        <div className="w-full">
          <div className="border-b border-grey-50 pb-3">
            <p className="font-bold text-grey-900 text-xl">Documents</p>
          </div>

          <div className="flex flex-wrap gap-4 my-4">
            {data?.map((doc: any, index: number) => {
              return (
                <div
                  key={`${index}--doc`}
                  className="w-full sm:w-[190px] md:w-[250px]"
                >
                  <div className="w-full h-[160px] bg-grey-50 rounded-md overflow-hidden group">
                    <button
                      onClick={() => downloadPdf(doc.rrDocuments)}
                      className="flex justify-center items-center"
                    >
                      <div className="hidden h-full transition-all group-hover:flex justify-center items-center group-hover:bg-grey-200">
                        <PrimaryBtn text="open" />
                      </div>
                    </button>
                  </div>

                  {/* </a> */}

                  <h4 className="font-bold leading-[20px] mt-3 mb-1 overflow-auto truncate">
                    {doc.icDocuments}
                  </h4>
                  <p className="font-light text-grey-400 text-sm leading-[20px]">
                    {/* {date} */}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferencesTab;
