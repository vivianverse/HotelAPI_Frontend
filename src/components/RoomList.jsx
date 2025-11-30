export default function RoomList({ rooms, onEdit, onDelete }) {
  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100 mt-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rooms.map((r) => (
            <tr
              key={r._id}
              className="hover:bg-indigo-50 transition duration-300 ease-in-out"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {r.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {r.type}
              </td>
              {/* Added currency formatting for better presentation */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                ${r.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button
                  onClick={() => onEdit(r)}
                  className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out mr-4 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md p-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(r._id)}
                  className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}