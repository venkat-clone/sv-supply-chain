'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {VehicleTypeApiClient} from "@/lib/api/VehicleType";

import TableComponent from "@/components/TableComponent";
import { VehicleApiClient } from '@/lib/api/Vehicle';
import VehicleTypeDetails from '@/components/infoCards/VehicleTypeCard';


export default function VehicleTypeDetailsPage() {
    const { id } = useParams();

    const {
        data: vehicletype,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['VehicleTypeDetails', id],
        queryFn: () => VehicleTypeApiClient.getById(id),
        enabled: !!id,
    });

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

    if (isLoading) return <p className="p-4">Loading vehicletype...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!vehicletype) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">VehicleType Details - #{vehicletype.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <VehicleTypeDetails vehicletype={vehicletype}/>
            
            </div>
            <TableComponent
    tableKey="VehicleType-vehicles"
    getAllFn={VehicleApiClient.getAll}
    headers={vehicleHeaders}
    redirect="/dashboard/Vehicle"
    title="Vehicles"
    defaultFilters={{
        typeId: `=${vehicletype.id}`
    }}

/>


        </div>
    );
}
