"use client";

import { useState, useEffect } from "react";
import { BedDouble, Users, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const [roomsCount, setRoomsCount] = useState(0);
  const [guestsCount, setGuestsCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [connectionStatus, setConnectionStatus] = useState("");

  useEffect(() => {
    async function loadCounts() {
      try {
        const [roomsRes, guestsRes, bookingsRes] = await Promise.all([
          fetch("https://hotel-api-ak2w.onrender.com/api/rooms"),
          fetch("https://hotel-api-ak2w.onrender.com/api/guests"),
          fetch("https://hotel-api-ak2w.onrender.com/api/bookings"),
        ]);

        const rooms = await roomsRes.json();
        const guests = await guestsRes.json();
        const bookings = await bookingsRes.json();

        setRoomsCount(rooms.data?.length || 0);
        setGuestsCount(guests.data?.length || 0);
        setBookingsCount(bookings.data?.length || 0);
      } catch (err) {
        console.error("Error fetching counts", err);
      } finally {
        setLoading(false);
      }
    }
    loadCounts();
  }, []);

  const testConnection = async () => {
    setConnectionStatus("Checking...");

    try {
      await Promise.all([
        fetch("https://hotel-api-ak2w.onrender.com/api/rooms"),
        fetch("https://hotel-api-ak2w.onrender.com/api/guests"),
        fetch("https://hotel-api-ak2w.onrender.com/api/bookings"),
      ]);

      setConnectionStatus("Connected");
    } catch {
      setConnectionStatus("Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span className="text-blue-600">🏨</span> Hotel Management System
        </h1>
        <p className="text-gray-600">
          Complete CRUD operations for rooms, guests, and bookings
        </p>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Rooms */}
        <div
          className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/rooms")}
        >
          <h3 className="font-semibold flex items-center gap-2">
            Total Rooms <BedDouble size={18} />
          </h3>
          <p className="text-3xl font-bold mt-3">
            {loading ? "…" : roomsCount}
          </p>
          <p className="text-gray-500 text-sm mt-1">Click to manage rooms</p>
        </div>

        {/* Guests */}
        <div
          className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/guests")}
        >
          <h3 className="font-semibold flex items-center gap-2">
            Total Guests <Users size={18} />
          </h3>
          <p className="text-3xl font-bold mt-3">
            {loading ? "…" : guestsCount}
          </p>
          <p className="text-gray-500 text-sm mt-1">Click to manage guests</p>
        </div>

        {/* Bookings */}
        <div
          className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/bookings")}
        >
          <h3 className="font-semibold flex items-center gap-2">
            Total Bookings <CalendarDays size={18} />
          </h3>
          <p className="text-3xl font-bold mt-3">
            {loading ? "…" : bookingsCount}
          </p>
          <p className="text-gray-500 text-sm mt-1">Click to manage bookings</p>
        </div>

      </div>

      {/* API CONNECTION TEST */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-2">API Connection Test</h3>
        <p className="text-gray-600 mb-4">
          Test connection to your hotel API endpoints
        </p>

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={testConnection}
            className="px-5 py-2 bg-black text-white rounded-lg shadow"
          >
            Test API Connection
          </button>

          {connectionStatus && (
            <span
              className={`px-3 py-1 rounded-lg text-sm ${
                connectionStatus === "Connected"
                  ? "bg-green-100 text-green-700"
                  : connectionStatus === "Failed"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {connectionStatus}
            </span>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-xl text-sm">
          <h4 className="font-semibold mb-2">API Endpoints Used:</h4>
          <ul className="text-blue-900 space-y-1">
            <li>• Rooms: https://hotel-api-ak2w.onrender.com/api/rooms</li>
            <li>• Guests: https://hotel-api-ak2w.onrender.com/api/guests</li>
            <li>• Bookings: https://hotel-api-ak2w.onrender.com/api/bookings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
