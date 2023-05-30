import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", user);
    res.data && dispatch(loginSuccess(res.data));
    
  } catch (err) {
    dispatch(loginFailure());
  }
};
