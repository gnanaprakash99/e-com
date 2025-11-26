import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes, { id } from "../utils/ApiRoutes";
import toast from "react-hot-toast";

const useCategory = () => {

    const { data: categoryQuery, refetch: categoryQueryRefetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const response = await axiosInstance.get(ApiRoutes.GET_USER_CATEGORY.path);
            return response.data;
        },
    });

    const addTocategoryMutation = useMutation({
        mutationKey: ['addTocategory'],
        mutationFn: async (formData) => {
            const response = await axiosInstance.post(
                ApiRoutes.ADD_TO_CATEGORY.path,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            return response.data;
        },
        onSuccess: () => {
            categoryQueryRefetch();
            toast.success("Category added successfully!");
        },
        onError: (error) => {
            // Check if the error response exists and has category_name
            const errMsg = error?.response?.data?.category_name?.[0] || "Failed to add category";
            toast.error(errMsg);
        },
    });

    const removeFromcategoryMutation = useMutation({
        mutationKey: ['removeFromcategory'],
        mutationFn: async (id) => {
            const response = await axiosInstance.delete(ApiRoutes.REMOVE_FROM_CATEGORY.path(id));
            return response.data;
        },
        onSuccess: () => {
            categoryQueryRefetch();
        },
    });

    return {
        categories: categoryQuery ?? [],
        categoryQueryRefetch,
        addTocategoryMutation,
        removeFromcategoryMutation,
    };
};

export default useCategory;