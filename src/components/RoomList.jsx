import { PencilSquareIcon, TrashIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';


export default function RoomList({ rooms, onEdit, onDelete }) {
  return (
    
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <div className="p-5">
              <img 
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="A general photo of a hotel room" 
                className="h-48 w-full object-cover rounded-md mb-4" 
              />

              {/* Room Type Tag */}
              <div className="flex items-center justify-between">
                <span 
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                    room.type === 'Suite' ? 'bg-yellow-100 text-yellow-800' : 
                    room.type === 'Double' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {room.type}
                </span>
              </div>
              
              {/* Room Details */}
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 truncate">
                  Room #: <span className="text-indigo-600">{room.number}</span>
                </h3>
                <p className="mt-1 text-xl font-extrabold text-green-600">
                 Price: ₱{room.price.toFixed(2)}
                  <span className="text-base font-medium text-gray-500 ml-1">/ night</span>
                </p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => onEdit(room)}
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md p-1"
                aria-label="Edit room"
              >
                <PencilSquareIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Edit
              </button>
              <button
                onClick={() => onDelete(room._id)}
                className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md p-1"
                aria-label="Delete room"
              >
                <TrashIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Fallback for no rooms */}
        {rooms.length === 0 && (
          <div className="col-span-full p-8 text-center bg-white shadow-lg rounded-xl">
            <p className="text-lg text-gray-500">
              No rooms found. Start by adding a new room!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}