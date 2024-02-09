import { capitalizeWords } from "@/libs/CapitalizeWords";
import { TOrgProfile } from "@/types/organizationTypes";

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
    </div>
  );
};

export default ProfileTab;
