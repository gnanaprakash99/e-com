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

    return {
        updateProfileMutation,
    }

}

export default useProfile;