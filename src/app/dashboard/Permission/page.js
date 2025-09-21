
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PermissionApiClient } from '@/lib/api/Permission';
import TableComponent from '@/components/TableComponent';
import CreatePermissionForm from "@/components/forms/PermissionForm";
import { useRouter } from "next/navigation";
import RolePermissionSelect from '@/components/selectors/RolePermissionSelector';


const PermissionTable = () => {
    const [Permission, setPermission] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setPermission({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => PermissionApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['Permissions']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'action', label: 'Action',type: 'String' },
{ key: 'description', label: 'Description',type: 'String' },
{ key: 'createdAt', label: 'CreatedAt',render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A',type: 'date' }
    ];

    const handleEditRow = (row) => {
        setPermission(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Permission Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-lg">+</span> Add Permission
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="Permissions"
                deleteMutation={deleteMutation.mutate}
                getAllFn={PermissionApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/Permission"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreatePermissionForm editPermission={Permission} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PermissionTable;
        