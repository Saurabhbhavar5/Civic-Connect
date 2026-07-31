import api from "./api";

export const userLogin = (credentials) => api.post("/auth/user/login", credentials);
export const userRegister = (data) => api.post("/auth/user/register", data);
export const adminLogin = (credentials) => api.post("/auth/admin/login", credentials);
export const adminRegister = (data) => api.post("/auth/admin/register", data);
