
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VehicleApiClient } from '@/lib/api/Vehicle';
import TableComponent from '@/components/TableComponent';
import CreateVehicleForm from "@/components/forms/VehicleForm";
import { useRouter } from "next/navigation";
import VehicleTypeSelect from '@/components/selectors/VehicleTypeSelector';
import OrderSelect from '@/components/selectors/OrderSelector';
import UserSelect from '@/components/selectors/UserSelector';


const VehicleTable = () => {
    const [Vehicle, setVehicle] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setVehicle({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => VehicleApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['Vehicles']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'number', label: 'Number',type: 'String' },
{ key: 'typeId', label: 'TypeId',type: 'Int' },
{ key: 'capacityTons', label: 'CapacityTons',type: 'Float' },
{ key: 'owned', label: 'Owned' , render: (row) => row.owned ? 'Yes' : 'No' , type: 'boolean'},
{ key: 'isAvailable', label: 'IsAvailable' , render: (row) => row.isAvailable ? 'Yes' : 'No' , type: 'boolean'},
{ key: 'provider', label: 'Provider',type: 'String' },
{ key: 'contact', label: 'Contact',type: 'String' },
{ key: 'currentStatus', label: 'CurrentStatus',type: 'String' },
{ key: 'createdAt', label: 'CreatedAt',render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A',type: 'date' }
    ];

    const handleEditRow = (row) => {
        setVehicle(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Vehicle Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-lg">+</span> Add Vehicle
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="Vehicles"
                deleteMutation={deleteMutation.mutate}
                getAllFn={VehicleApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/Vehicle"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreateVehicleForm editVehicle={Vehicle} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default VehicleTable;
        