import axios from "axios";
import { UserLogin } from "../types";

function login(user: UserLogin) {
  return axios.post("http://localhost:5888/api/auth", user);
}

export default {
  login,
};
