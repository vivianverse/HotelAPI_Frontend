import { useState, useEffect } from "react";
import api from "../api/api";
import GuestForm from "../components/GuestForm";
import GuestList from "../components/GuestList";

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchGuests = async () => {
    try {
      const raw = await api.raw.get("/guests");
      console.log("RAW /guests axios response:", raw);

      const list = await api.get("/guests");
      console.log("UNWRAPPED guests list:", list);

      setGuests(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch guests error:", err);
      alert("Failed to load guests — open console to inspect.");
    }
  };

  useEffect(() => { fetchGuests(); }, []);

  const createGuest = async (data) => {
    try {
      const created = await api.post("/guests", data);
      setGuests((p) => [created, ...p]);
    } catch (err) {
      console.error("Create guest error:", err);
      alert("Failed to create guest.");
    }
  };

  const updateGuest = async (id, data) => {
    try {
      const updated = await api.put(`/guests/${id}`, data);
      setGuests((p) => p.map((g) => (g._id === id ? updated : g)));
      setEditData(null);
    } catch (err) {
      console.error("Update guest error:", err);
      alert("Failed to update guest.");
    }
  };

  const deleteGuest = async (id) => {
    if (!confirm("Delete guest?")) return;
    try {
      await api.delete(`/guests/${id}`);
      setGuests((p) => p.filter((g) => g._id !== id));
    } catch (err) {
      console.error("Delete guest error:", err);
      alert("Failed to delete guest.");
    }
  };

  return (
    <div>
      <h2>Guests</h2>
      <GuestForm className="mb-8"
        initial={editData}
        onSubmit={(data) => editData ? updateGuest(editData._id, data) : createGuest(data)}
        onCancel={() => setEditData(null)}
      />
      <GuestList className="mt-8" guests={guests} onEdit={setEditData} onDelete={deleteGuest} />
    </div>
  );
}
