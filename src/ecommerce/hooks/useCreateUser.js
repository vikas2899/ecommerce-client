import { useQuery } from "react-query";
import { service } from "../axios/axios";

const createUser = ({ firstname, lastname, email, password, mobile }) => {
  return service.post("auth/register", {
    firstname,
    lastname,
    phone: mobile,
    email,
    password,
  });
};

export const useCreateUser = (formData) => {
  return useQuery("create-user", () => createUser(formData), {
    enabled: false,
    retry: false,
  });
};
