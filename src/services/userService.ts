import axios from "axios";
import { UserRegister } from "../types";
import { BASE_URL } from "../constants";

function register(user: UserRegister) {
  return axios.post(`${BASE_URL}/api/users`, user);
}

export default {
  register,
};
