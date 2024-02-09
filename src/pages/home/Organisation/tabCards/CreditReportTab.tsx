import AvailableDocuments from "./AvailableDocuments";

function CreditReportTab() {
  return (
    <div className="w-full">
      <div className="w-full scrollbar-hide overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse border-spacing-0">
          <thead className="w-full text-xs text-grey-400 bg-grey-50">
            <tr className="w-full">
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 rounded-l-md text-dark-300 font-medium"
              >
                Credit Score
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 text-dark-300 font-medium"
              >
                Reporting Agency
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 w-[200px] rounded-r-md text-dark-300 font-medium"
              >
                Payment History
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-2 rounded-r-md text-dark-300 font-medium"
              >
                Outstanding Credit Line
              </th>
            </tr>
          </thead>

          <tbody className="w-full">
            <tr className="">
              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 rounded-l-md text-grey-500"
              >
                720
              </td>
              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 text-dark-300"
              >
                Equifax
              </td>
              <td
                scope="col"
                className="text-sm  px-6 py-2 rounded-r-md text-dark-300"
              >
                No Late Payments in the Last 12 Months.
              </td>

              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 rounded-r-md text-dark-300"
              >
                $50,000
              </td>
            </tr>

            <tr className="">
              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 rounded-l-md text-grey-500"
              >
                720
              </td>
              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 text-dark-300"
              >
                Equifax
              </td>
              <td
                scope="col"
                className="text-sm  px-6 py-2 rounded-r-md text-dark-300"
              >
                No Late Payments in the Last 12 Months.
              </td>

              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 rounded-r-md text-dark-300"
              >
                $50,000
              </td>
            </tr>

            <tr className="">
              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 rounded-l-md text-grey-500"
              >
                720
              </td>
              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 text-dark-300"
              >
                Equifax
              </td>
              <td
                scope="col"
                className="text-sm  px-6 py-2 rounded-r-md text-dark-300"
              >
                No Late Payments in the Last 12 Months.
              </td>

              <td
                scope="col"
                className="text-sm whitespace-nowrap px-6 py-2 rounded-r-md text-dark-300"
              >
                $50,000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 w-full">
        <AvailableDocuments />
      </div>
    </div>
  );
}

export default CreditReportTab;
