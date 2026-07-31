import api from "./api";

export const getAllDepartments = () => api.get("/departments");
