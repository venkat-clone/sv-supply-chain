'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {VehicleApiClient} from "@/lib/api/Vehicle";

import TableComponent from "@/components/TableComponent";
import { OrderApiClient } from '@/lib/api/Order';
import { UserApiClient } from '@/lib/api/User';
import VehicleDetails from '@/components/infoCards/VehicleCard';
import VehicleTypeDetails from '@/components/infoCards/VehicleTypeCard';

export default function VehicleDetailsPage() {
    const { id } = useParams();

    const {
        data: vehicle,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['VehicleDetails', id],
        queryFn: () => VehicleApiClient.getById(id),
        enabled: !!id,
    });

                const userHeaders = [
            { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'phone', label: 'Phone',type: 'String' },
{ key: 'roleId', label: 'RoleId',type: 'Int' },
{ key: 'address', label: 'Address',type: 'String' }
            ];
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

    if (isLoading) return <p className="p-4">Loading vehicle...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!vehicle) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Vehicle Details - #{vehicle.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <VehicleDetails vehicle={vehicle}/>
            <VehicleTypeDetails type={vehicle.type}/>
            </div>
            <TableComponent
    tableKey="Vehicle-orders"
    getAllFn={OrderApiClient.getAll}
    headers={orderHeaders}
    redirect="/dashboard/Order"
    title="Orders"
    defaultFilters={{
        vehicleId: `=${vehicle.id}`
    }}

/>
<TableComponent
    tableKey="Vehicle-drivers"
    getAllFn={UserApiClient.getAll}
    headers={userHeaders}
    redirect="/dashboard/User"
    title="Drivers"
    defaultFilters={{
        drivers: `=${vehicle.id}`
    }}

/>


        </div>
    );
}
