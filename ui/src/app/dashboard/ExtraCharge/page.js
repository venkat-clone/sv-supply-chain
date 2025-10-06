
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExtraChargeApiClient } from '@/lib/api/ExtraCharge';
import TableComponent from '@/components/TableComponent';
import CreateExtraChargeForm from "@/components/forms/ExtraChargeForm";
import { useRouter } from "next/navigation";
import OrderSelect from '@/components/selectors/OrderSelector';


const ExtraChargeTable = () => {
    const [ExtraCharge, setExtraCharge] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setExtraCharge({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => ExtraChargeApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['ExtraCharges']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'orderId', label: 'OrderId',type: 'Int' },
{ key: 'title', label: 'Title',type: 'String' },
{ key: 'amount', label: 'Amount',type: 'Float' },
{ key: 'createdAt', label: 'CreatedAt',render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A',type: 'date' }
    ];

    const handleEditRow = (row) => {
        setExtraCharge(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">ExtraCharge Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-lg">+</span> Add ExtraCharge
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="ExtraCharges"
                deleteMutation={deleteMutation.mutate}
                getAllFn={ExtraChargeApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/ExtraCharge"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreateExtraChargeForm editExtraCharge={ExtraCharge} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ExtraChargeTable;
        