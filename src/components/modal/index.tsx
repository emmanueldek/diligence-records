import ReactDOM from "react-dom";
import { GoX } from "react-icons/go";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function ModalWrapper({ children, onClose }: IModalProps) {
  const modalRoot = document?.getElementById("modal-root") as HTMLDivElement;
  return ReactDOM.createPortal(
    <div className="fixed z-50 top-0 w-full h-full bg-[#00000040]">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="bg-white rounded-md w-[90%] max-w-[650px] m-auto shadow p-4">
          <div className="flex justify-end items-center">
            <div className="cursor-pointer flex justify-center items-center bg-grey-50 group hover:bg-grey-100 rounded-md transition-all w-[30px] h-[30px]">
              <GoX
                className="text-xl stroke-1 text-grey-400 group-hover:text-grey-900"
                onClick={onClose}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>,
    modalRoot,
  );
}

export default ModalWrapper;
