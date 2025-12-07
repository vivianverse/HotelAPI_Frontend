import { useState, useEffect } from "react";
import api from "../api/api";
import RoomForm from "../components/RoomForm";
import RoomList from "../components/RoomList";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch rooms from the API
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const list = await api.get("/rooms");
      setRooms(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch rooms error:", err);
      alert("Failed to load rooms. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFormClose = () => {
    setEditData(null);
    setShowForm(false);
  };

  // Create/Update/Delete Room Handlers (Client-side)
  const createRoom = async (data) => {

    // Client-side duplicate check validation
    const roomNumber = (data?.number ?? "").toString().trim();
    if (rooms.some((r) => String(r.number).trim() === roomNumber)) {
      alert("Room number already exists. Please use a different number.");
      return;
    }

    try {
      const created = await api.post("/rooms", data);
      setRooms((prev) => [created, ...prev]);
      setShowForm(false);
      alert("Room created successfully.");
    } 
    catch (err) {
      console.error("Create room error:", err);
      
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err?.message || "";
      if (status === 409 || /duplicate/i.test(String(msg))) {
        alert("Duplicate room detected. The room was not added.");
        return;
      }
      alert("Failed to create room.");
    }
  };

 
  const updateRoom = async (id, data) => {
    try {
      const updated = await api.put(`/rooms/${id}`, data);
      setRooms((prev) => prev.map((r) => (r._id === id ? updated : r)));
      handleFormClose();
      alert("Room updated successfully.");
    }
     catch (err) {
      console.error("Update room error:", err);
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err?.message || "";
      if (status === 409 || /duplicate/i.test(String(msg))) {
        alert("Duplicate room detected. The room was not updated.");
        return;
      }
      alert("Failed to update room.");
    }
  };

  const deleteRoom = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      setRooms((prev) => prev.filter((r) => r._id !== id));
      alert("Room deleted successfully.");
    } catch (err) {
      console.error("Delete room error:", err);
      alert("Failed to delete room.");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            🏨 Room Management
          </h1>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {showForm ? (
              <MinusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            ) : (
              <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            )}
            {showForm ? "Hide Form" : "Add New Room"}
          </button>
        </div>

        {/* Form Section */}
        {(showForm || editData) && (
          <div
            className={`bg-white p-6 shadow-xl rounded-lg mb-8 ${
              editData ? "border-2 border-indigo-500" : ""
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editData ? "📝 Edit Room Details" : "➕ Add New Room"}
            </h2>
            <RoomForm
              initial={editData}
              onSubmit={(data) =>
                editData ? updateRoom(editData._id, data) : createRoom(data)
              }
              onCancel={handleFormClose}
            />
          </div>
        )}

        {/* Loading/Status */}
        {loading && (
          <p className="text-center py-4 text-indigo-600 font-medium">
            Loading room data...
          </p>
        )}

        {/* Room List */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
          All Available Rooms
        </h2>

        {!loading && rooms.length === 0 ? (
          <div className="text-center py-12 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-lg text-gray-500">
              No rooms found. Click “Add New Room” to get started!
            </p>
          </div>
        ) : (
          <RoomList
            rooms={rooms}
            onEdit={(room) => {
              setEditData(room);
              setShowForm(true);
            }}
            onDelete={deleteRoom}
          />
        )}
      </div>
    </div>
  );
}
