import { useEffect, useState } from "react";

interface Depense {
  id: number;
  date: string;
  amount: number;
  description: string;
  category: string;
  name: string;
}

const InvoiceTable = () => {
  const [depenses, setDepenses] = useState<Depense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setDepenses(data.data);
        } else {
          throw new Error("Unexpected data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Date
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {depenses.map((depense) => (
              <tr key={depense.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {new Date(depense.date).toLocaleDateString()}
                  </h5>
                  <p className="text-sm">${depense.amount}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{depense.name}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    ${depense.amount}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {depense.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {depense.category}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
