import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import ApiRoutes from "../utils/ApiRoutes";

const useContact = () => {

    // create 
    const createContactMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post(ApiRoutes.CONTACT.path, data)
            return res.data;
        }
    })

    return {
        createContactMutation,
    }

}

export default useContact;