import { capitalizeWords } from "@/libs/CapitalizeWords";
import { TOrgProfile } from "@/types/organizationTypes";
import { RECORDS_URLS } from "@/utils/backendURLs";
import acrobatLogo from "@/assets/images/acrobat2.png";
import Loader from "@/components/Loader";
import { useState } from "react";
import toast from "react-hot-toast";

type TProps = {
  profileData?: TOrgProfile;
};

const ProfileTab: React.FC<TProps> = ({ profileData }) => {
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
      const hrefUrl = URL.createObjectURL(data);
      setLoading(false);
      window.open(hrefUrl, "_blank");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
          <div
            className="mt-3 hover:bg-grey-50 w-[250px] flex flex-col items-center py-[25px] rounded-lg cursor-pointer transition-all duration-300 ease-linear hover:scale-95 hover:transform"
            onClick={() => downloadPdf(profileData?.cacDocument)}
          >
            <img src={acrobatLogo} alt="document_logo" className="w-[200px]" />
            <p className="text-grey-400 font-medium mt-3">
              {profileData?.cacDocument}
            </p>
          </div>
        ) : (
          <p className="text-grey-400 font-medium mt-3">No document</p>
        )}
      </div>
      {loading && <Loader detail="Fetching Record..." />}
    </div>
  );
};

export default ProfileTab;
