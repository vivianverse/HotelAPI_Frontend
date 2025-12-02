
import { useState, useEffect } from "react";
import api from "../api/api";
import GuestForm from "../components/GuestForm";
import GuestList from "../components/GuestList";

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [editData, setEditData] = useState(null);
 

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

  // const createGuest = async (data) => {
  //   try {
  //     const res = await api.post("/guests", data);
  //     setGuests((prev) => [res.data, ...prev]);
      
  //     alert("Guest created successfully.");
  //   } catch (err) {
  //     console.error("Create guest error:", err.response?.data || err);
  //     alert("Failed to create guest: " + (err.response?.data?.error || err.message));
  //   }
  // };
  

  const createGuest = async (data) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    const res = await api.post("/guests", payload);
    const newGuest = res.data;
    setGuests((prev) => [newGuest, ...prev]);

  } catch (err) {
    console.error("Create guest error:", err.response?.data || err);
    alert(
      "Failed to create guest: " + (err.response?.data?.error || err.message)
    );
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

      {/* {loading ? (
        <p>Loading guests...</p>
      ) : (
        <GuestList
          guests={guests}
          onEdit={setEditData}
          onDelete={deleteGuest}
        />
      )} */}

      <GuestList
          guests={guests}
          onEdit={setEditData}
          onDelete={deleteGuest}
        />
    </div>
  );
}
