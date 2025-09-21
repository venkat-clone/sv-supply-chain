'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {OrderApiClient} from "@/lib/api/Order";

import TableComponent from "@/components/TableComponent";
import { ExtraChargeApiClient } from '@/lib/api/ExtraCharge';
import OrderDetails from '@/components/infoCards/OrderCard';
import UserDetails from '@/components/infoCards/UserCard';
import VehicleDetails from '@/components/infoCards/VehicleCard';
import LocationDetails from '@/components/infoCards/LocationCard';

export default function OrderDetailsPage() {
    const { id } = useParams();

    const {
        data: order,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['OrderDetails', id],
        queryFn: () => OrderApiClient.getById(id),
        enabled: !!id,
    });

                const extrachargeHeaders = [
            { key: 'id', label: 'Id',type: 'Int' },
{ key: 'orderId', label: 'OrderId',type: 'Int' },
{ key: 'title', label: 'Title',type: 'String' },
{ key: 'amount', label: 'Amount',type: 'Float' }
            ];

    if (isLoading) return <p className="p-4">Loading order...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!order) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Order Details - #{order.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <OrderDetails order={order}/>
            <UserDetails customer={order.customer}/>
<UserDetails driver={order.driver}/>
<VehicleDetails vehicle={order.vehicle}/>
<LocationDetails fromlocation={order.fromlocation}/>
<LocationDetails tolocation={order.tolocation}/>
            </div>
            <TableComponent
    tableKey="Order-charges"
    getAllFn={ExtraChargeApiClient.getAll}
    headers={extrachargeHeaders}
    redirect="/dashboard/ExtraCharge"
    title="Charges"
    defaultFilters={{
        orderId: `=${order.id}`
    }}

/>


        </div>
    );
}
