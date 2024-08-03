import axios from "axios";
import { User } from "../types";

function register(user: User) {
  return axios.post("http://localhost:5888/api/users", user);
}

export default {
  register,
};
