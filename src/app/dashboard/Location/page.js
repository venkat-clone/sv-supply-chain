
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LocationApiClient } from '@/lib/api/Location';
import TableComponent from '@/components/TableComponent';
import CreateLocationForm from "@/components/forms/LocationForm";
import { useRouter } from "next/navigation";
import UserSelect from '@/components/selectors/UserSelector';
import OrderSelect from '@/components/selectors/OrderSelector';


const LocationTable = () => {
    const [Location, setLocation] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setLocation({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => LocationApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['Locations']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'address', label: 'Address',type: 'String' },
{ key: 'pincode', label: 'Pincode',type: 'String' },
{ key: 'latitude', label: 'Latitude',type: 'Float' },
{ key: 'longitude', label: 'Longitude',type: 'Float' },
{ key: 'contactId', label: 'ContactId',type: 'Int' }
    ];

    const handleEditRow = (row) => {
        setLocation(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Location Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-lg">+</span> Add Location
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="Locations"
                deleteMutation={deleteMutation.mutate}
                getAllFn={LocationApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/Location"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreateLocationForm editLocation={Location} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LocationTable;
        