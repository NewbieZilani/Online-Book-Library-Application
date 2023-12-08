import axios from "axios";

const API_URL = "http://localhost:8081";

export const getAllBooks = async () => {
  const token = localStorage.getItem("token");
  return await axios
    .get(`${API_URL}/books/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
