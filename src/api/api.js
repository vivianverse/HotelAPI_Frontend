import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://hotel-api-ak2w.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 0,
});


function unwrapAxiosResponse(res) {
  if (!res) return res;
  const body = res.data;

  if (Array.isArray(body)) return body;
  if (body && Array.isArray(body.data)) return body.data;
  if (body && Array.isArray(body.guests)) return body.guests;
  if (body && Array.isArray(body.rooms)) return body.rooms;
  if (body && Array.isArray(body.bookings)) return body.bookings;

  if (body && body.data && typeof body.data === "object" && !Array.isArray(body.data)) return body.data;

  return body;
}

// exported wrappers
export default {
  raw: axiosInstance,
  get: async (path, config) => {
    const res = await axiosInstance.get(path, config);
    return unwrapAxiosResponse(res);
  },
  post: async (path, body, config) => {
    const res = await axiosInstance.post(path, body, config);
    return unwrapAxiosResponse(res);
  },
  put: async (path, body, config) => {
    const res = await axiosInstance.put(path, body, config);
    return unwrapAxiosResponse(res);
  },
  delete: async (path, config) => {
    const res = await axiosInstance.delete(path, config);
    return unwrapAxiosResponse(res);
  },
};
