import axios from "axios";
import { UserLogin } from "../types";
import { BASE_URL } from "../constants";

function login(user: UserLogin) {
  return axios.post(`${BASE_URL}/api/auth`, user);
}

export default {
  login,
};
