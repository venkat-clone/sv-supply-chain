import {toast} from "sonner";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {OrderApiClient} from "@/lib/api/Order";


export const useOrders = (data) => {
    return useQuery({
        queryKey: ["orders",data.filters],
        queryFn: () => OrderApiClient.getAll(data),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};