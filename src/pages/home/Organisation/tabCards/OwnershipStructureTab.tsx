import useGetShareHolder from "@/store/useGetShareHolder";
import { TColumn } from "@/types/executiveTypes";
import {
  TOrgOwnershipStructure,
  TOrgShareHolders,
} from "@/types/organizationTypes";
import { Link } from "react-router-dom";

type TProps = {
  data?: TOrgOwnershipStructure;
};

const OwnershipStructureTab: React.FC<TProps> = ({ data }) => {
  const columns = [
    { field: "name", header: "Name" },
    { field: "percentage", header: "Percentage (%)" },
  ];

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const { setShareHolder, setCurrentUrl } = useGetShareHolder();

  return (
    <div className="w-full scrollbar-hide overflow-x-auto">
      <div>
        <div className="border-b border-grey-50 w-full py-4">
          <h4 className="leading-[19px] font-bold mb-2">Ownership Type</h4>
          <p className="font-light text-grey-400 leading-[20px]">
            {data?.ownershipType}
          </p>
        </div>

        <div className="border-b border-grey-50 w-full py-4">
          <h4 className="leading-[19px] font-bold mb-2">Shareholders</h4>
          {/* <ul className="list-disc list-inside pl-2 font-light leading-[20px] text-grey-400">
            {data?.shareHolders.map((el, i) => {
              return (
                <li key={`${i}-shareHolders`}>
                  {el.name} : {el.percentage}%
                </li>
              );
            })}
          </ul> */}
          <table className="w-full">
            <thead className="text-sm text-grey-400 font-normal bg-grey-50">
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
                data.shareHolders?.map((row, i) => (
                  <tr
                    key={i}
                    className="h-[40px] text-sm text-[#151515] font-[500]"
                  >
                    {columns?.map((col: TColumn, i) => {
                      return (
                        <>
                          {col.field === "name" ? (
                            <td key={i} className="pl-4 font-light">
                              <Link
                                to={`/shareholders/${slugify(
                                  row[col.field as keyof TOrgShareHolders],
                                )}`}
                                className="text-[#355db4] cursor-pointer w-fit"
                                onClick={() => {
                                  setShareHolder(
                                    row[col.field as keyof TOrgShareHolders],
                                  );
                                  setCurrentUrl(window.location.href);
                                }}
                              >
                                {row[col.field as keyof TOrgShareHolders]}
                              </Link>
                            </td>
                          ) : (
                            <td
                              key={i}
                              className="pl-4 font-light text-textGrey"
                            >
                              {row[col.field as keyof TOrgShareHolders]}
                            </td>
                          )}
                        </>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* 
        <div className="py-4">
          <h4 className="leading-[19px] font-bold mb-2">
            Governance Structure
          </h4>
          <p className="font-light text-grey-400 leading-[20px]">
            {data?.governanceStructure}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default OwnershipStructureTab;
