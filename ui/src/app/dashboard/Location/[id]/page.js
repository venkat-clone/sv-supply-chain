'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {LocationApiClient} from "@/lib/api/Location";

import TableComponent from "@/components/TableComponent";
import { OrderApiClient } from '@/lib/api/Order';
import LocationDetails from '@/components/infoCards/LocationCard';
import UserDetails from '@/components/infoCards/UserCard';

export default function LocationDetailsPage() {
    const { id } = useParams();

    const {
        data: location,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['LocationDetails', id],
        queryFn: () => LocationApiClient.getById(id),
        enabled: !!id,
    });

                const orderHeaders = [
            { key: 'id', label: 'Id',type: 'Int' },
{ key: 'customerId', label: 'CustomerId',type: 'Int' },
{ key: 'driverId', label: 'DriverId',type: 'Int' },
{ key: 'vehicleId', label: 'VehicleId',type: 'Int' },
{ key: 'fromLocationId', label: 'FromLocationId',type: 'Int' },
{ key: 'toLocationId', label: 'ToLocationId',type: 'Int' },
{ key: 'loadTons', label: 'LoadTons',type: 'Float' },
{ key: 'status', label: 'status',type: 'enum', values: ['active', 'inactive', 'pending'] },
{ key: 'estimatedDistance', label: 'EstimatedDistance',type: 'Float' },
{ key: 'traveledDistance', label: 'TraveledDistance',type: 'Float' },
{ key: 'extraDistance', label: 'ExtraDistance',type: 'Float' },
{ key: 'requestedAt', label: 'RequestedAt',render: (row) => row.requestedAt ? new Date(row.requestedAt).toLocaleDateString() : 'N/A',type: 'date' },
{ key: 'deliveredAt', label: 'DeliveredAt',render: (row) => row.deliveredAt ? new Date(row.deliveredAt).toLocaleDateString() : 'N/A',type: 'date' },
{ key: 'totalCharge', label: 'TotalCharge',type: 'Float' },
{ key: 'transactionStatus', label: 'transaction Status',type: 'enum', values: ['active', 'inactive', 'pending'] }
            ];

    if (isLoading) return <p className="p-4">Loading location...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!location) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Location Details - #{location.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <LocationDetails location={location}/>
            <UserDetails contact={location.contact}/>
            </div>
            <TableComponent
    tableKey="Location-sentorders"
    getAllFn={OrderApiClient.getAll}
    headers={orderHeaders}
    redirect="/dashboard/Order"
    title="SentOrders"
    defaultFilters={{
        fromLocationId: `=${location.id}`
    }}

/>
<TableComponent
    tableKey="Location-receivedorders"
    getAllFn={OrderApiClient.getAll}
    headers={orderHeaders}
    redirect="/dashboard/Order"
    title="ReceivedOrders"
    defaultFilters={{
        fromLocationId: `=${location.id}`
    }}

/>


        </div>
    );
}
