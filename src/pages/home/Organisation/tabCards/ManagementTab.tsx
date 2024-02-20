import { TColumn, TOrgManagement } from "@/types/organizationTypes";
import dangote from "@/assets/images/dangote.jpeg";

type TProps = {
  data?: TOrgManagement[];
};

// const columns: TColumn[] = [
//   { field: "name", header: "Name" },
//   { field: "position", header: "Position" },
//   { field: "location", header: "Location" },
// ];

const ManagementTab: React.FC<TProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="w-full scrollbar-hide overflow-x-auto">
        {/* <table className="w-full text-sm text-left text-gray-500 border-collapse border-spacing-0">
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
            data.map((row, i) => (
              <tr
                key={i}
                className="h-[40px] text-sm text-[#151515] font-[500]"
              >
                {columns?.map((col: TColumn, i) => (
                  <td key={i} className="pl-4 font-light text-textGrey">
                    {row[col.field as keyof TOrgManagement]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table> */}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[2rem]">
        {data &&
          data.map((data: any, index: number) => {
            return (
              <div
                className="relative h-[230px] flex items-start justify-center"
                key={index}
              >
                <img
                  src={data.imageUrl ? data.imageUrl : dangote}
                  className="rounded-[5px] object-cover h-[160px]"
                />

                <div className="absolute bottom-0 w-full text-center min-h-[60px] flex items-center justify-center">
                  <p className="text-[0.9rem] font-bold absolute top-0">
                    {data?.name}
                  </p>
                  <p className="text-[0.7rem] mt-2 leading-tight">
                    {data?.position}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ManagementTab;
