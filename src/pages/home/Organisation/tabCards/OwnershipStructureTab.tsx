import { TOrgOwnershipStructure } from "@/types/organizationTypes";

type TProps = {
  data?: TOrgOwnershipStructure;
};

const OwnershipStructureTab: React.FC<TProps> = ({ data }) => {
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
          <ul className="list-disc list-inside pl-2 font-light leading-[20px] text-grey-400">
            {data?.shareHolders.map((el, i) => {
              return (
                <li key={`${i}-shareHolders`}>
                  {el.name} : {el.percentage}%
                </li>
              );
            })}
          </ul>
        </div>

        <div className="py-4">
          <h4 className="leading-[19px] font-bold mb-2">
            Governance Structure
          </h4>
          <p className="font-light text-grey-400 leading-[20px]">
            {data?.governanceStructure}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnershipStructureTab;
