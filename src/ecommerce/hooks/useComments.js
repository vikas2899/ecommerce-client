import { useQuery, useMutation } from "react-query";
import { service } from "../axios/axios";

const getComments = (productId) => {
  return service.get(`comment/get/${productId}`);
};

const saveUserComment = ({ productId, commentData }) => {
  return service.post(
    "comment/create/" + productId + "/" + commentData?.userId,
    commentData
  );
};

export const useGetProductComments = (productId) => {
  return useQuery(["get-comment", productId], () => getComments(productId), {
    enabled: !!productId,
  });
};

export const useSaveUserComment = () => {
  return useMutation(saveUserComment);
};
