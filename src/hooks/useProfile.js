import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";
import useAuth from "./useAuth";

const useProfile = () => {
    const { userProfileRefetch } = useAuth();

    // update Profile
    const updateProfileMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.put(ApiRoutes.UPDATE_PROFILE.path, data)
            return res.data;
        },
        onSuccess: async () => {
            await userProfileRefetch();
        }
    })

    // get 
    const { data: profile, refetch: refetchProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await axiosInstance.get(ApiRoutes.GET_PROFILE.path)
            return data;
        }
    })

    return {
        updateProfileMutation,
        profile,
        refetchProfile,
    }

}

export default useProfile;