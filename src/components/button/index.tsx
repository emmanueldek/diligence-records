import React, { FC } from "react";
import { ClipLoader } from "react-spinners";
import { IconType } from "react-icons";

interface ITransparentBtnProps {
  text: string;
  className?: string;
  Icon?: IconType;
  onClick?: () => void;
}

export const TransparentBtn: FC<ITransparentBtnProps> = ({
  className,
  text,
  Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        py-1.5 px-3 rounded-md text-[14px] text-center
        font-medium transition-all duration-500 text-grey-900
        bg-transparent hover:bg-grey-100 outline outline-2 outline-offset-[-1px]
        outline-grey-400 hover:outline-none group flex justify-center items-center ${className}
      `}
    >
      {Icon && <Icon className="mr-1 text-lg text-grey-900" />}
      <p>{text}</p>
    </button>
  );
};

interface IButtonProps {
  text: string;
  className?: string;
  type?: "submit" | "button" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  Icon?: IconType;
}

export const PrimaryBtn: FC<IButtonProps> = ({
  className,
  text,
  Icon,
  type,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        group py-1.5 px-3 rounded-md text-[14px] text-center font-medium
        transition-all duration-500 text-white bg-grey-900 hover:text-grey-900
        hover:bg-grey-100 flex justify-center items-center ${className}
      `}
    >
      {Icon && (
        <Icon className="mr-1 text-lg text-white transition-all duration-500 group-hover:text-grey-900" />
      )}
      <p>{text}</p>
    </button>
  );
};

interface ILoadingBtnpROPS {
  isLoading: boolean;
  text: string;
  type?: "submit" | "button" | "reset";
  className?: string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LoadingBtn: FC<ILoadingBtnpROPS> = ({
  isLoading,
  className,
  text,
  type,
  color,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={`
        py-1.5 px-3 flex justify-center items-center rounded-md text-[14px]
        text-center font-medium transition-all duration-500 bg-grey-900 text-white
        hover:bg-grey-100 hover:text-grey-900 ${className}
      `}
    >
      {isLoading ? <ClipLoader size={20} color={color || "#ffffff"} /> : text}
    </button>
  );
};
