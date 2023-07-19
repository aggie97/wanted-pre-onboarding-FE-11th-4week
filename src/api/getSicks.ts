import { AxiosError } from "axios";
import httpClient from "./axiosInstance";

export async function getSicks(text: string) {
  try {
    const response = await httpClient.get(`sick?q=${text}`);
    if (response.data.length) return response.data;
    return [];
  } catch (error) {
    if (error instanceof AxiosError) alert(error.message);
  }
}
