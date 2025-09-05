import axios from "axios";

const api = "http://localhost:3000";

export const shortenUrl = async (data) => {
  try {
    const response = await axios.post(`${api}/api/shorten`, data);
    return response.data.shortUrl;
  } catch (err) {
    console.log(err);
  }
};
