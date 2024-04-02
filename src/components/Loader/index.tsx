import { BarLoader } from "react-spinners";
import RecordsLetterLogo from "../svgs/RecordsLetterLogo";

const Loader = ({ detail }: any) => {
  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-[100vw] flex flex-col justify-center items-center bg-white">
      {detail && <p className="mb-6 text-[#4a4a4a]">{detail}</p>}
      <BarLoader width={50} speedMultiplier={0.5} color="#16171B" />
      <div className="mt-6">
        <RecordsLetterLogo />
      </div>
    </div>
  );
};

export default Loader;
