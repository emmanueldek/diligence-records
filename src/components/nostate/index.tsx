import { useNavigate } from "react-router-dom";
import { PrimaryBtn } from "..";

interface IEmptyStateProps {
  img: string;
  title: string;
  description: string;
  btnText?: string;
  navigateTo?: string;
}

const NoState = ({
  img,
  title,
  description,
  btnText,
  navigateTo,
}: IEmptyStateProps) => {
  const navigate = useNavigate();
  return (
    <div className="text-center flex flex-col justify-center items-center py-5 h-full w-full">
      <figure className="mb-4 w-[240px]">
        <img src={img} alt="no_result" />
      </figure>
      <h1 className="font-bold text-3xl text-center">{title}</h1>
      <p className="font-light text-grey-400 mb-6 text-center w-full max-w-[600px] ">
        {description}
      </p>

      {navigateTo && btnText ? (
        <PrimaryBtn text={btnText} onClick={() => navigate(navigateTo)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NoState;
