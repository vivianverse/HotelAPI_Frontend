import { PencilSquareIcon, TrashIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function BookingList({ bookings = [], guests = [], rooms = [], onEdit, onDelete }) {

  const findGuestName = (guestRef) => {
    if (!guestRef) return "Unknown Guest";

    if (typeof guestRef === "object" && guestRef.name) return guestRef.name;

    const guest = guests.find(g => g._id === guestRef || g.id === guestRef);
    return guest?.name || "Unknown Guest";
  };

 const findRoomInfo = (roomRef) => {
    if (!roomRef) return { number: "Unknown Room", type: "N/A" };

    if (typeof roomRef === "object" && roomRef.number) {
      return { number: roomRef.number, type: roomRef.type || "N/A" };
    }

    const room = rooms.find(r => r._id === roomRef || r.id === roomRef);
    return {
      number: room?.number || "Unknown Room",
      type: room?.type || "N/A"
    };
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-100 rounded-lg shadow-sm bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Room</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-In</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-Out</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {bookings.map((b) => {
            const guestName = findGuestName(b.guestId || b.guest);
            const roomInfo = findRoomInfo(b.roomId || b.room);

            return (
              <tr key={b._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {guestName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {roomInfo.number} — <span className="text-indigo-600">{roomInfo.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(b.checkIn).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(b.checkOut).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => onEdit(b)}
                    className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                  >
                    <PencilSquareIcon className="h-4 w-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(b._id)}
                    className="text-red-600 hover:text-red-800 inline-flex items-center"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" /> Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {/* Empty State */}
          {bookings.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-500">
                <CalendarDaysIcon className="h-6 w-6 inline-block mb-1 text-gray-400" /> No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
