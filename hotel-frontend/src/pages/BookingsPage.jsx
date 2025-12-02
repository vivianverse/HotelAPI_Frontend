import { useState, useEffect } from "react";
import api from "../api/api";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [b, g, r] = await Promise.all([
        api.get("/bookings"),
        api.get("/guests"),
        api.get("/rooms"),
      ]);
      setBookings(Array.isArray(b) ? b : []);
      setGuests(Array.isArray(g) ? g : []);
      setRooms(Array.isArray(r) ? r : []);
    } catch (err) {
      console.error("Fetch all error:", err);
      alert("Failed to load bookings/guests/rooms. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const createBooking = async (data) => {
    try {
      const created = await api.post("/bookings", data);
      setBookings((p) => [created, ...p]);
    } catch (err) {
      console.error("Create booking error:", err);
      alert("Failed to create booking.");
    }
  };

  const updateBooking = async (id, data) => {
    try {
      const updated = await api.put(`/bookings/${id}`, data);
      setBookings((p) => p.map((b) => (b._id === id ? updated : b)));
      setEditData(null);
    } catch (err) {
      console.error("Update booking error:", err);
      alert("Failed to update booking.");
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm("Delete booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings((p) => p.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete booking error:", err);
      alert("Failed to delete booking.");
    }
  };

  return (
    <div>
      <h2>Bookings</h2>
      {loading && <p>Loading...</p>}
      <BookingForm
        guests={guests}
        rooms={rooms}
        initial={editData}
        onSubmit={(data) => editData ? updateBooking(editData._id, data) : createBooking(data)}
        onCancel={() => setEditData(null)}
      />
      <BookingList className="mt-8" bookings={bookings} guests={guests} rooms={rooms} onEdit={setEditData} onDelete={deleteBooking} />
    </div>
  );
}
