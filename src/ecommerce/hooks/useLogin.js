import { useQuery } from "react-query";
import { service } from "../axios/axios";

const loginUser = ({ email, password }) => {
  return service.post("auth/login", {
    email,
    password,
  });
};
export const useLogin = (formData) => {
  return useQuery("login", () => loginUser(formData), {
    enabled: false,
    retry: false,
    cacheTime: 0,
  });
};
