
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RoleApiClient } from '@/lib/api/Role';
import TableComponent from '@/components/TableComponent';
import CreateRoleForm from "@/components/forms/RoleForm";
import { useRouter } from "next/navigation";
import UserSelect from '@/components/selectors/UserSelector';
import RolePermissionSelect from '@/components/selectors/RolePermissionSelector';


const RoleTable = () => {
    const [Role, setRole] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setRole({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => RoleApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['Roles']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'description', label: 'Description',type: 'String' },
{ key: 'createdAt', label: 'CreatedAt',render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A',type: 'date' }
    ];

    const handleEditRow = (row) => {
        setRole(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-lg">+</span> Add Role
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="Roles"
                deleteMutation={deleteMutation.mutate}
                getAllFn={RoleApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/Role"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreateRoleForm editRole={Role} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default RoleTable;
        