import axios from "axios";

// Login Player
export const loginPlayer = (values) => {
  const url = "api/loginPlayer";

  return axios.post(url, values).then((response) => response.data);
};

// Register Player
export const registerPlayer = (values) => {
  const url = "api/registerPlayer";

  return axios.post(url, values).then((response) => response.data);
};
