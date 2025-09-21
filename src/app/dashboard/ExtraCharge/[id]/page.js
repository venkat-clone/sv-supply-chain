'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {ExtraChargeApiClient} from "@/lib/api/ExtraCharge";

import TableComponent from "@/components/TableComponent";

import ExtraChargeDetails from '@/components/infoCards/ExtraChargeCard';
import OrderDetails from '@/components/infoCards/OrderCard';

export default function ExtraChargeDetailsPage() {
    const { id } = useParams();

    const {
        data: extracharge,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['ExtraChargeDetails', id],
        queryFn: () => ExtraChargeApiClient.getById(id),
        enabled: !!id,
    });

    

    if (isLoading) return <p className="p-4">Loading extracharge...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!extracharge) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">ExtraCharge Details - #{extracharge.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <ExtraChargeDetails extracharge={extracharge}/>
            <OrderDetails order={extracharge.order}/>
            </div>
            


        </div>
    );
}
