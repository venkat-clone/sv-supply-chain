
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RolePermissionApiClient } from '@/lib/api/RolePermission';
import TableComponent from '@/components/TableComponent';
import CreateRolePermissionForm from "@/components/forms/RolePermissionForm";
import { useRouter } from "next/navigation";
import RoleSelect from '@/components/selectors/RoleSelector';
import PermissionSelect from '@/components/selectors/PermissionSelector';


const RolePermissionTable = () => {
    const [RolePermission, setRolePermission] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setRolePermission({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => RolePermissionApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['RolePermissions']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'roleId', label: 'RoleId',type: 'Int' },
{ key: 'permissionId', label: 'PermissionId',type: 'Int' }
    ];

    const handleEditRow = (row) => {
        setRolePermission(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">RolePermission Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-lg">+</span> Add RolePermission
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="RolePermissions"
                deleteMutation={deleteMutation.mutate}
                getAllFn={RolePermissionApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/RolePermission"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreateRolePermissionForm editRolePermission={RolePermission} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RolePermissionTable;
        