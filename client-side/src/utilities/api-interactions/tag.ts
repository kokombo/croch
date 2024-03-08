import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useAddNewTag = (tagData: FormData) => {
  const { accessToken } = useCurrentUser();

  const addNewTagRequest = async (
    tagData: FormData
  ): Promise<Tag | undefined> => {
    const res = await axios.post(
      `${api_base_url}/tag/addNewTag`,

      tagData,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, error, isPending } = useMutation({
    mutationKey: ["addNewTag"],
    mutationFn: addNewTagRequest,
  });

  const addNewTag = async () => {
    await mutateAsync(tagData);
  };

  return { addNewTag, data, isError, error, isPending };
};

export const useUpdateTag = (tagId: string, tagData: FormData) => {
  const { accessToken } = useCurrentUser();

  const updateTagRequest = async (
    tagData: FormData
  ): Promise<Tag | undefined> => {
    const res = await axios.put(
      `${api_base_url}/tag/updateTag?tagId=${tagId}`,

      tagData,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, error, isPending } = useMutation({
    mutationKey: ["updateTag", tagId],
    mutationFn: updateTagRequest,
  });

  const updateTag = async () => {
    await mutateAsync(tagData);
  };

  return { updateTag, data, isError, error, isPending };
};

export const useGetAllTags = () => {
  const getAllTagsRequest = async (): Promise<Tag[] | undefined> => {
    const res = await axios.get(`${api_base_url}/tag/getAllTags`);

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllTags"],
    queryFn: getAllTagsRequest,
  });

  return { data, isLoading, isError, error };
};
