
import { useState, useEffect } from "react";
import api from "../api/api";
import GuestForm from "../components/GuestForm";
import GuestList from "../components/GuestList";

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [editData, setEditData] = useState(null);
 
  // Create/Read/Update/Delete Guest Handlers (Client-side) //
  const fetchGuests = async () => {
    try {
      const res = await api.get("/guests");
      console.log("API response:", res); 

      setGuests(Array.isArray(res) ? res : []);
      console.log("Guests loaded:", res);
      
    } catch (err) {
      console.error("Fetch guests error:", err);
      alert("Failed to load guests — check console for details.");
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);


  const createGuest = async (data) => {
    const emailExists = guests.some(
      (g) => g?.email?.toLowerCase() === (data.email || "").toLowerCase()
    );
    if (emailExists) {
      return alert("This email is already registered. Please use a different email.");
    }

    try {
      const created = await api.post("/guests", data);
      setGuests((p) => [created, ...p]);
      alert("Guest created successfully.");
    } catch (err) {
      
      const status = err?.response?.status;
      const body = err?.response?.data;

      // Handle duplicate email from server (recommended status 409)
      if (status === 409 || (body && /email/i.test(body?.error || body?.message || ""))) {
        return alert("A guest with that email already exists.");
      }

      console.error("Create guest error:", err.response?.data || err);
      alert("Failed to create guest. Check console for details.");
    }
  };



  const updateGuest = async (id, data) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    const res = await api.put(`/guests/${id}`, payload);
    setGuests((prev) => prev.map((g) => (g._id === id ? res : g)));
    setEditData(null);
    alert("Guest updated successfully.");
  } catch (err) {
    console.error("Update guest error:", err.response?.data || err);
    alert(
      "Failed to update guest: " + (err.response?.data?.error || err.message)
    );
  }
};


  const deleteGuest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guest?")) return;

    try {
      await api.delete(`/guests/${id}`);
      setGuests((prev) => prev.filter((g) => g._id !== id));
      alert("Guest deleted successfully.");
    } catch (err) {
      console.error("Delete guest error:", err.response?.data || err);
      alert("Failed to delete guest: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <GuestForm
        key={editData?._id || "new"} 
        initial={editData}
        onSubmit={(data) =>
          editData ? updateGuest(editData._id, data) : createGuest(data)
        }
        onCancel={() => setEditData(null)}
      />


      <GuestList
          guests={guests}
          onEdit={setEditData}
          onDelete={deleteGuest}
        />
    </div>
  );
}