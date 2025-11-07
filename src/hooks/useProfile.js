import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useProfile = () => {

    // update Profile
    const updateProfileMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post(ApiRoutes.UPDATE_PROFILE.path, data)
            return res.data;
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