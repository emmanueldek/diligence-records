import { useState } from "react";

const TablePagination = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const handleNext = () => {
    if (pageNumber >= 1 && pageNumber < 10) {
      setPageNumber((prev) => prev + 1);
    } else {
      return;
    }
  };
  const handleBack = () => {
    if (pageNumber <= 10 && pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    } else {
      return;
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 my-5">
      <span
        onClick={handleBack}
        className="w-10 h-10 mr-4 rounded-lg border border-grey-100 inline-flex justify-center items-center cursor-pointer hover:bg-grey-50"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.32743 8.99995L11.1645 5.16286L9.83869 3.83704L4.67578 8.99995L9.83869 14.1629L11.1645 12.837L7.32743 8.99995Z"
            fill="#353740"
          />
        </svg>
      </span>
      <span
        onClick={() => setPageNumber(1)}
        className={`w-10 h-10 font-medium cursor-pointer rounded-lg  inline-flex justify-center items-center ${
          pageNumber === 1
            ? "bg-grey-900 text-white"
            : "bg-transparent hover:bg-grey-50"
        }`}
      >
        1
      </span>
      <span
        onClick={() => setPageNumber(2)}
        className={`w-10 h-10 font-medium cursor-pointer rounded-lg  inline-flex justify-center items-center ${
          pageNumber === 2
            ? "bg-grey-900 text-white"
            : "bg-transparent hover:bg-grey-50"
        }`}
      >
        2
      </span>
      <span
        onClick={() => setPageNumber(3)}
        className={`w-10 h-10 font-medium cursor-pointer rounded-lg  inline-flex justify-center items-center ${
          pageNumber === 3
            ? "bg-grey-900 text-white"
            : "bg-transparent hover:bg-grey-50"
        }`}
      >
        3
      </span>
      <span className="font-medium">...</span>
      <span
        onClick={() => setPageNumber(10)}
        className={`w-10 h-10 font-medium cursor-pointer rounded-lg  inline-flex justify-center items-center ${
          pageNumber === 10
            ? "bg-grey-900 text-white"
            : "bg-transparent hover:bg-grey-50"
        }`}
      >
        10
      </span>

      <span
        onClick={handleNext}
        className="w-10 h-10 ml-4 rounded-lg border border-grey-100 inline-flex justify-center items-center cursor-pointer hover:bg-grey-50"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.673 8.99995L6.83594 5.16286L8.16176 3.83704L13.3247 8.99995L8.16176 14.1629L6.83594 12.837L10.673 8.99995Z"
            fill="#353740"
          />
        </svg>
      </span>
    </div>
  );
};

export default TablePagination;
