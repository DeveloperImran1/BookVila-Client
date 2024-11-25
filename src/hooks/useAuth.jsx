
"use client"
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosPublic from "./useAxiosPublic";

const useAuth = () => {
    const axiosPublic = useAxiosPublic();
    const session = useSession();
    const email = session?.data?.user?.email;
    const {data, refetch, isLoading, isPending} = useQuery({
        queryKey: ['profile', email],
        queryFn: async ()=> {
            const result = await axiosPublic.get(`/getMyProfileInfo/${email}`)
            return result?.data;
        }
    })
    return {data, refetch, isLoading, isPending}
}

export default useAuth;