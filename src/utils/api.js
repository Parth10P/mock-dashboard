import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchProfile = (userId) =>
  api
    .get("/api/auth/profile", {
      headers: { "x-user-id": userId },
    })
    .then((res) => res.data);

export const fetchDashboard = (userId) =>
  api
    .get("/api/auth/dashboard", {
      headers: { "x-user-id": userId },
    })
    .then((res) => res.data);

export const fetchStats = (userId) =>
  api
    .get("/api/call-sessions/stats", {
      headers: { "x-user-id": userId },
    })
    .then((res) => res.data);

export const fetchCallHistory = (userId, limit = 10) =>
  api
    .get(`/api/call-sessions?limit=${limit}`, {
      headers: { "x-user-id": userId },
    })
    .then((res) => res.data);
