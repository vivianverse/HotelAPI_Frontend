import { useState, useEffect } from "react";
import api from "../api/api";
import RoomForm from "../components/RoomForm";
import RoomList from "../components/RoomList";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const list = await api.get("/rooms");
      
      setRooms(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch rooms error:", err);
      alert("Failed to load rooms. See console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const createRoom = async (data) => {
    try {
      const created = await api.post("/rooms", data);
      setRooms((prev) => [created, ...prev]);
    } catch (err) {
      console.error("Create room error:", err);
      alert("Failed to create room.");
    }
  };

  const updateRoom = async (id, data) => {
    try {
      const updated = await api.put(`/rooms/${id}`, data);
      setRooms((prev) => prev.map((r) => (r._id === id ? updated : r)));
      setEditData(null); 
    } catch (err) {
      console.error("Update room error:", err);
      alert("Failed to update room.");
    }
  };

  const deleteRoom = async (id) => {
    if (!confirm("Are you sure you want to delete this room? This action cannot be undone.")) return;
    try {
      await api.delete(`/rooms/${id}`);
      setRooms((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete room error:", err);
      alert("Failed to delete room.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
       
        
        {/* Room Form Section */}
        <div className={`bg-white p-6 shadow-xl rounded-lg mb-8 ${editData ? 'border-2 border-indigo-500' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editData ? "📝 Edit Room" : "➕ Add New Room"}
          </h2>
          <RoomForm
            initial={editData}
            onSubmit={(data) => editData ? updateRoom(editData._id, data) : createRoom(data)}
            onCancel={() => setEditData(null)}
          />
        </div>

        {/* Loading/Status Indicator */}
        {loading && (
          <p className="text-center py-4 text-indigo-600 font-medium">
            Loading room data...
          </p>
        )}
        
        {/* Room List Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
          All Available Rooms
        </h2>
        
        {!loading && rooms.length === 0 ? (
          <div className="text-center py-12 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-lg text-gray-500">
              No rooms found. Start by adding a new room above!
            </p>
          </div>
        ) : (
          <RoomList 
            rooms={rooms} 
            onEdit={setEditData} 
            onDelete={deleteRoom} 
          />
        )}
      </div>
    </div>
  );
}