import { capitalizeWords } from "@/libs/CapitalizeWords";
import { TOrgProfile } from "@/types/organizationTypes";
import { PrimaryBtn } from "@/components";

type TProps = {
  profileData?: TOrgProfile;
};

const ProfileTab: React.FC<TProps> = ({ profileData }) => {
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h3 className="text-grey-900 font-bold">About</h3>
        <p className="font-light mt-2 mb-2 border-b border-grey-50 pb-2">
          {profileData?.organizationDescription}
        </p>
      </div>

      <div className="w-full mb-6">
        <h3 className="text-grey-900 font-bold">Company Address</h3>
        <p className="font-light mt-2 mb-2 border-b border-grey-50 pb-2">
          {capitalizeWords(profileData?.location as string)}
        </p>
      </div>

      <div className="w-full mb-6">
        <h3 className="text-grey-900 font-bold">Website</h3>
        <a
          href={profileData?.website}
          className="font-light mt-2 mb-2 border-b border-grey-50 pb-2 hover:underline"
        >
          {profileData?.website}
        </a>
      </div>
      <div className="w-full mb-6">
        <h3 className="text-grey-900 font-bold">CAC Registration Number</h3>
        <p className="font-light mt-2 mb-2 border-b border-grey-50 pb-2">
          {capitalizeWords(profileData?.cacNumber as string)}
        </p>
      </div>

      <div className="mt-6 w-full">
        <div className="border-b border-grey-50 pb-3">
          <p className="font-bold text-grey-900 text-[1.1rem]">CAC Document</p>
        </div>

        {profileData?.cacDocument ? (
          <div className="w-full sm:w-[190px] md:w-[250px]">
            <div className="w-full h-[160px] bg-grey-50 rounded-md overflow-hidden group">
              <a href={profileData?.cacDocument}>
                <div className="hidden h-full transition-all group-hover:flex justify-center items-center group-hover:bg-grey-200">
                  <PrimaryBtn text="open" />
                </div>
              </a>
            </div>

            {/* </a> */}

            <h4 className="font-bold leading-[20px] mt-3 mb-1 overflow-auto truncate">
              {}
            </h4>
            <p className="font-light text-grey-400 text-sm leading-[20px]"></p>
          </div>
        ) : (
          <p className="text-grey-400 font-medium mt-3">No document</p>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
