'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {UserApiClient} from "@/lib/api/User";

import TableComponent from "@/components/TableComponent";
import { OrderApiClient } from '@/lib/api/Order';
import { VehicleApiClient } from '@/lib/api/Vehicle';
import { LocationApiClient } from '@/lib/api/Location';
import UserDetails from '@/components/infoCards/UserCard';
import RoleDetails from '@/components/infoCards/RoleCard';

export default function UserDetailsPage() {
    const { id } = useParams();

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['UserDetails', id],
        queryFn: () => UserApiClient.getById(id),
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
            const locationHeaders = [
            { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'address', label: 'Address',type: 'String' },
{ key: 'pincode', label: 'Pincode',type: 'String' },
{ key: 'latitude', label: 'Latitude',type: 'Float' },
{ key: 'longitude', label: 'Longitude',type: 'Float' },
{ key: 'contactId', label: 'ContactId',type: 'Int' }
            ];
            const vehicleHeaders = [
            { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'number', label: 'Number',type: 'String' },
{ key: 'typeId', label: 'TypeId',type: 'Int' },
{ key: 'capacityTons', label: 'CapacityTons',type: 'Float' },
{ key: 'owned', label: 'Owned' , render: (row) => row.owned ? 'Yes' : 'No' , type: 'boolean'},
{ key: 'isAvailable', label: 'IsAvailable' , render: (row) => row.isAvailable ? 'Yes' : 'No' , type: 'boolean'},
{ key: 'provider', label: 'Provider',type: 'String' },
{ key: 'contact', label: 'Contact',type: 'String' },
{ key: 'currentStatus', label: 'CurrentStatus',type: 'String' }
            ];

    if (isLoading) return <p className="p-4">Loading user...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!user) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Details - #{user.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <UserDetails user={user}/>
            <RoleDetails role={user.role}/>
            </div>
            <TableComponent
    tableKey="User-orders"
    getAllFn={OrderApiClient.getAll}
    headers={orderHeaders}
    redirect="/dashboard/Order"
    title="Orders"
    defaultFilters={{
        customerId: `=${user.id}`
    }}

/>
<TableComponent
    tableKey="User-vehicle"
    getAllFn={VehicleApiClient.getAll}
    headers={vehicleHeaders}
    redirect="/dashboard/Vehicle"
    title="Vehicle"
    defaultFilters={{
        vehicle: `=${user.id}`
    }}

/>
<TableComponent
    tableKey="User-rides"
    getAllFn={OrderApiClient.getAll}
    headers={orderHeaders}
    redirect="/dashboard/Order"
    title="Rides"
    defaultFilters={{
        customerId: `=${user.id}`
    }}

/>
<TableComponent
    tableKey="User-location"
    getAllFn={LocationApiClient.getAll}
    headers={locationHeaders}
    redirect="/dashboard/Location"
    title="Location"
    defaultFilters={{
        contactId: `=${user.id}`
    }}

/>


        </div>
    );
}
