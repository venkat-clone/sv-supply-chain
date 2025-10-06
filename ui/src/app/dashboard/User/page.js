
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserApiClient } from '@/lib/api/User';
import TableComponent from '@/components/TableComponent';
import CreateUserForm from "@/components/forms/UserForm";
import { useRouter } from "next/navigation";
import RoleSelect from '@/components/selectors/RoleSelector';
import OrderSelect from '@/components/selectors/OrderSelector';
import VehicleSelect from '@/components/selectors/VehicleSelector';
import LocationSelect from '@/components/selectors/LocationSelector';


const UserTable = () => {
    const [User, setUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!isModalOpen){
            setUser({});
        }
    }, [isModalOpen]);

    const queryClient = useQueryClient();


    

    const deleteMutation = useMutation({
        mutationFn: (id) => UserApiClient.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['Users']),
    });


    const headers = [
        { key: 'id', label: 'Id',type: 'Int' },
{ key: 'name', label: 'Name',type: 'String' },
{ key: 'phone', label: 'Phone',type: 'String' },
{ key: 'roleId', label: 'RoleId',type: 'Int' },
{ key: 'address', label: 'Address',type: 'String' },
{ key: 'createdAt', label: 'CreatedAt',render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A',type: 'date' }
    ];

    const handleEditRow = (row) => {
        setUser(row);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <div className="flex gap-3">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                    onClick={() => router.push("/dashboard/User/new")}
                >
                    <span className="text-lg">+</span> Add User
                </button>
                

                    </div>
            </div>


            <TableComponent
                key="Users"
                deleteMutation={deleteMutation.mutate}
                getAllFn={UserApiClient.getAll}
                headers={headers}
                onEditRow={handleEditRow}
                redirect="/dashboard/User"
            />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="max-w-xl">
                        <CreateUserForm editUser={User} closeModal={setIsModalOpen}/>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserTable;
        