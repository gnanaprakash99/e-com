import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useBanner = () => {
    const { data: bannerQuery, refetch: bannerQueryRefetch } = useQuery({
        queryKey: ['banner'],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return [];
            const response = await axiosInstance.get(ApiRoutes.GET_USER_BANNER.path);
            return response.data;
        },
        enabled: !!localStorage.getItem("accessToken"),
    });

    const addTobannerMutation = useMutation({
        mutationKey: ['addTobanner'],
        mutationFn: async (payload) => {

            const isFormData = payload instanceof FormData;

            const response = await axiosInstance.post(
                ApiRoutes.ADD_TO_BANNER.path,
                payload,
                {
                    headers: isFormData
                        ? { "Content-Type": "multipart/form-data" }
                        : { "Content-Type": "application/json" }
                }
            );

            return response.data;
        },
        onSuccess: () => bannerQueryRefetch(),
    });

    const removeFrombannerMutation = useMutation({
        mutationKey: ['removeFrombanner'],
        mutationFn: async (id) => {
            const response = await axiosInstance.delete(ApiRoutes.REMOVE_FROM_BANNER.path(id));
            return response.data;
        },
        onSuccess: () => {
            bannerQueryRefetch();
        },
    });

    return {
        bannerData: bannerQuery ?? [],
        bannerQueryRefetch,
        addTobannerMutation,
        removeFrombannerMutation,
    };
};

export default useBanner;