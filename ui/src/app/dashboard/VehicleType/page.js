
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VehicleTypeApiClient } from '@/lib/api/VehicleType';
import TableComponent from '@/components/TableComponent';
import CreateVehicleTypeForm from "@/components/forms/VehicleTypeForm";
import { useRouter } from "next/navigation";
import VehicleSelect from '@/components/selectors/VehicleSelector';


const VehicleTypeTable = () => {
    const [VehicleType, setVehicleType] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setVehicleType({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => VehicleTypeApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['VehicleTypes']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'minLoadCapacity', label: 'MinLoadCapacity',type: 'Float' },
{ key: 'maxLoadCapacity', label: 'MaxLoadCapacity',type: 'Float' },
{ key: 'minDistance', label: 'MinDistance',type: 'Float' },
{ key: 'maxDistance', label: 'MaxDistance',type: 'Float' },
{ key: 'description', label: 'Description',type: 'String' }
    ];

    const handleEditRow = (row) => {
        setVehicleType(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">VehicleType Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-lg">+</span> Add VehicleType
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="VehicleTypes"
                deleteMutation={deleteMutation.mutate}
                getAllFn={VehicleTypeApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/VehicleType"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreateVehicleTypeForm editVehicleType={VehicleType} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default VehicleTypeTable;
        