"use client"
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosPublic from "./useAxiosPublic";
import { cartBookGet, favoruteBookGet } from "./localStorage";

const useMyCartBooks = () => {
    // const axiosPublic = useAxiosPublic();
    // const session = useSession();
    // const {data, refetch, isLoading} = useQuery({
    //     queryKey: ['myCart'],
    //     queryFn: async ()=> {
    //         const result = await axiosPublic.get(`/getMyAddToCart/${session?.data?.user?.email}`)
    //         return result?.data;
    //     }
    // })
    // return {data, refetch, isLoading}

   const data = cartBookGet();
   const refetch = ()=> cartBookGet();
   return {data, refetch}
}

export default useMyCartBooks;