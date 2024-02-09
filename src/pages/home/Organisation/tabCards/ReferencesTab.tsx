import { TransparentBtn } from "@/components";
import { GoFile } from "react-icons/go";

function ReferencesTab() {
  return (
    <div className="w-full scrollbar-hide overflow-x-auto">
      <div className="border-b border-grey-50 pb-2 mb-2">
        <h4 className="font-bold text-xl mb-3">Record 1</h4>
        <div className="mb-2">
          <p className="font-bold mb-1">
            Client Reference:&nbsp;
            <span className="font-light">Acme Corporation</span>
          </p>
          <p className="font-bold mb-1">
            Feedback:&nbsp;
            <span className="font-light">
              "Reliable supplier, consistently met delivery deadlines."
            </span>
          </p>
          <p className="font-bold">
            Date of Feedback:&nbsp;
            <span className="font-light">August 10, 2022</span>
          </p>
        </div>

        <div className="px-1 my-4">
          <TransparentBtn Icon={GoFile} text="Download Record" />
        </div>

        <div className="">
          <p className="font-bold mb-1">
            Link:&nbsp;
            <a
              href="www.financy.com/898hehe983h"
              target="_blank"
              className="font-light text-link hover:underline"
            >
              www.financy.com/898hehe983h
            </a>
          </p>
          <p className="font-bold">
            Link:&nbsp;
            <a
              href="www.financy.com/898hehe983h"
              target="_blank"
              className="font-light text-link hover:underline"
            >
              www.financy.com/898hehe983h
            </a>
          </p>
        </div>
      </div>

      <div className="">
        <h4 className="font-bold text-xl mb-3">Record 2</h4>
        <div className="mb-2">
          <p className="font-bold mb-1">
            Partner Reputation:&nbsp;
            <span className="font-light">Industry Awards and Recognition</span>
          </p>
          <p className="font-bold mb-1">
            Awards Received:&nbsp;
            <span className="font-light">
              "Supplier of the Year 2021," "Excellence in Customer Service"
            </span>
          </p>
          <p className="font-bold">
            Recognized By:&nbsp;
            <span className="font-light">
              Industry Associations and Publications
            </span>
          </p>
        </div>

        <div className="px-1 my-4">
          <TransparentBtn Icon={GoFile} text="Download Record" />
        </div>

        <div className="">
          <p className="font-bold mb-1">
            Link:&nbsp;
            <a
              href="www.financy.com/898hehe983h"
              target="_blank"
              className="font-light text-link hover:underline"
            >
              www.financy.com/898hehe983h
            </a>
          </p>
          <p className="font-bold">
            Link:&nbsp;
            <a
              href="www.financy.com/898hehe983h"
              target="_blank"
              className="font-light text-link hover:underline"
            >
              www.financy.com/898hehe983h
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReferencesTab;
