import { capitalizeWords } from "@/libs/CapitalizeWords";
import { TExeProfile } from "@/types/executiveTypes";

type TProps = {
  profileData?: TExeProfile;
};

const ProfileTab: React.FC<TProps> = ({ profileData }) => {
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h3 className="text-grey-900 font-bold">About</h3>
        <p className="font-light mt-2 mb-2 border-b border-grey-50 pb-2">
          {profileData?.executiveDescription}
        </p>
      </div>

      <div className="w-full mb-6">
        <h3 className="text-grey-900 font-bold">Executive Address</h3>
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
        <h3 className="text-grey-900 font-bold">Organization Size</h3>
        <p className="font-light mt-2 mb-2 border-b border-grey-50 pb-2">
          {profileData?.organizationSize}
        </p>
      </div>

      <div className="w-full mb-6">
        <h3 className="text-grey-900 font-bold">Industry</h3>
        <p className="font-light mt-2 mb-2 border-b border-grey-50 pb-2">
          {profileData?.industry}
        </p>
      </div>
    </div>
  );
};

export default ProfileTab;
