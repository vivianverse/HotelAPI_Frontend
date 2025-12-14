

---

# 🏨 Hotel API Frontend (React + Vite)

<p align="center">
  <img src="https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/API-RESTful-blue" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

---

## 📌 Overview  
This project is the **frontend** for the Hotel RESTful API, built using **React.js** and **Vite**.  
It focuses on fetching, displaying, and managing **hotels, rooms, guests, and bookings** from your hosted backend API.

---

## API Endpoints Used:
• Rooms: https://hotel-api-ak2w.onrender.com/api/rooms
• Guests: https://hotel-api-ak2w.onrender.com/api/guests
• Bookings: https://hotel-api-ak2w.onrender.com/api/bookings

## 🌐 BASE URL (Frontend & Backend)  
**Backend APIs:**  
- https://hotel-api-ak2w.onrender.com  
- https://hotel-qd7kitlh2-vivianverses-projects.vercel.app  

**Frontend (Deploy URL):**  
- https://hotel-api-frontend-two.vercel.app/
- https://hotel-api-frontend-81wb.vercel.app/
- https://hotelapi-6fzu.onrender.com/

---
📸SCREENSHOT
<img width="1920" height="1080" alt="Screenshot (219)" src="https://github.com/user-attachments/assets/5b1032d0-bce3-45d8-a9d4-ef2f26c4461a" />


## 📬 Sample API Inputs (POSTMAN)  

**➤ ROOMS (POST)**  
```json
{
  "roomNumber": "101",
  "type": "Deluxe",
  "price": 2500,
  "status": "Available"
}
```

**➤ ROOMS (PUT)**  
```json
"Occupied"
```

**➤ GUESTS (POST)**  
```json
{
  "name": "Maria Santos",
  "email": "maria.santos@example.com",
  "phone": "09171234567"
}
```

**➤ BOOKINGS (POST)**  
```json
{
  "guestId": "6717a12e3e6d2345a12b45cd",
  "roomId": "6717a12e3e6d2345a12b45cf",
  "checkInDate": "2025-10-25",
  "checkOutDate": "2025-10-28"
}
```

---

## 🏗️ Project Structure  
```csharp
project/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page views
│   ├── api/          # API handlers
│   ├── hooks/             # Custom logic
│   ├── assets/            # Images, icons
│   ├── App.jsx
│   └── main.jsx
├── public/
├── vite.config.js
├── package.json
└── README.md
```

---

## 🧰 Requirements  
- Node.js (v16+)  
- npm or yarn  
- A running Hotel RESTful API server  

**Install Dependencies**  
```bash
npm install
```

---

## ⚙️ Step 1: Run Locally  
```bash
npm run dev
```
App runs at:  
```
http://localhost:5173
```

---

## 🔌 Step 2: Connect to Backend API  
Create or edit:  
`src/config/api.js`  

```js
export const API_BASE_URL = "https://hotel-api-ak2w.onrender.com";
```

---

## 🧠 Example Service/pages File (pages/RoomsPage.jsx)  
```javascript
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
```

---

## 🖥️ Example Component (RoomList.jsx)  
```javascript
export default function RoomList({ rooms, onEdit, onDelete }) {
  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100 mt-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rooms.map((r) => (
            <tr
              key={r._id}
              className="hover:bg-indigo-50 transition duration-300 ease-in-out"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {r.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {r.type}
              </td>
              {/* Added currency formatting for better presentation */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                ${r.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button
                  onClick={() => onEdit(r)}
                  className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out mr-4 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md p-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(r._id)}
                  className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 📦 Build for Production  
```bash
npm run build
```

**Preview build:**  
```bash
npm run preview
```

---

## ☁️ Deployment (Vercel / Netlify)  
1. Push code to GitHub  
2. Import into Vercel or Netlify  
3. Build command:  
   ```bash
   npm run build
   ```  
4. Output directory:  
   ```
   dist
   ```  
5. Add environment variable if needed:  
   ```ini
   VITE_API_BASE_URL=<backend URL>
   ```

---

## 🧭 Recap  
- ⚡ Fast React + Vite setup  
- 🌐 Fully API-driven frontend  
- 🏨 Works with your hosted Hotel API  
- 🔧 Easy to expand (bookings, filtering, admin, etc.)  

---

## 🧑‍💻 Author  
**Hotel API Frontend — React + Vite**  
Feel free to modify or use for your own projects.

---

⭐ If you find this project useful, don’t forget to give it a **star** on GitHub!  

---
