import axios from "axios";
import { User } from "../types/User";
import { Activity } from "../types/Activity";

const API_URL = "http://localhost:5000";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/accounts/list`);
  return response.data?.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${API_URL}/accounts/create`, user);
  return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const response = await axios.patch(`${API_URL}/accounts/update/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/accounts/delete/${id}`);
};

export const fetchUserActivities = async (
  userId: number
): Promise<Activity[]> => {
  const response = await axios.get(`${API_URL}/activity/${userId}`);
  return response.data?.user.activityLogs;
};

export const downloadPdf = async (userId: number): Promise<void> => {
  const response = await axios.get(`${API_URL}/report/${userId}`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `user_${userId}_report.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
