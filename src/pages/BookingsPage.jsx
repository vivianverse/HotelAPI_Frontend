import { useState, useEffect } from "react";
import api from "../api/api";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch all necessary data
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [bookingsData, guestsData, roomsData] = await Promise.all([
        api.get("/bookings"),
        api.get("/guests"),
        api.get("/rooms"),
      ]);

      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setGuests(Array.isArray(guestsData) ? guestsData : []);
      setRooms(Array.isArray(roomsData) ? roomsData : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to load data. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleFormClose = () => {
    setEditData(null);
    setShowForm(false);
  };

  // Create Booking Handlers
  const createBooking = async (data) => {
    try {
      const created = await api.post("/bookings", data);
      setBookings((prev) => [created, ...prev]);
      setShowForm(false);
      alert("Booking created successfully.");
    } catch (err) {
      console.error("Create booking error:", err);
      alert("Failed to create booking.");
    }
  };

  // Update Booking Handler
  const updateBooking = async (id, data) => {
  try {
    console.log("Updating booking with data:", data);
    const updated = await api.put(`/bookings/${id}`, data);
    setBookings((prev) => prev.map((b) => (b._id === id ? updated : b)));
    setEditData(null);
    alert("Booking updated successfully.");
  } catch (err) {
    console.error("Update booking error:", err.response?.data || err);
    alert("Failed to update booking. Check console for details.");
  }
};

  // Delete Booking Handler
  const deleteBooking = async (id) => {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Booking deleted successfully.");
    } catch (err) {
      console.error("Delete booking error:", err);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">📅 Booking Management</h1>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="flex items-center px-4 py-2 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            {showForm ? (
              <MinusIcon className="h-5 w-5 mr-2" />
            ) : (
              <PlusIcon className="h-5 w-5 mr-2" />
            )}
            {showForm ? "Hide Form" : "Add New Booking"}
          </button>
        </div>

        {/* Form */}
        {(showForm || editData) && (
          <div className={`bg-white p-6 shadow-lg rounded-lg mb-8 ${editData ? "border-2 border-indigo-500" : ""}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editData ? "📝 Edit Booking" : "➕ New Booking"}
            </h2>
            <BookingForm
              initial={editData}
              guests={guests}
              rooms={rooms}
              onSubmit={(data) =>
                editData ? updateBooking(editData._id, data) : createBooking(data)
              }
              onCancel={handleFormClose}
            />
          </div>
        )}

        {/* List */}
        {loading ? (
          <p className="text-center text-indigo-600 font-medium py-4">Loading bookings...</p>
        ) : (
          <BookingList
            bookings={bookings}
            guests={guests}
            rooms={rooms}
            onEdit={(b) => {
              setEditData(b);
              setShowForm(true);
            }}
            onDelete={deleteBooking}
          />
        )}
      </div>
    </div>
  );
}
