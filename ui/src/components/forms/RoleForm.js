
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleApiClient } from "@/lib/api/Role";
import UserSelect from '@/components/selectors/UserSelector';
import RolePermissionSelect from '@/components/selectors/RolePermissionSelector';


const CreateRoleForm = ({ editRole, closeModal }) => {
    const [Role, setRole] = useState({});
    const [editingRoleId, setEditingRoleId] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editRole) {
            setRole(editRole);
            setEditingRoleId(editRole.id);
        }
    }, [editRole]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingRoleId) {
            updateMutation.mutate({ id: editingRoleId, data: Role });
        } else {
            createMutation.mutate(Role);
        }
    };

    const createMutation = useMutation({
        mutationFn: RoleApiClient.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['Roles']);
            setRole({});
            closeModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => RoleApiClient.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['Roles']);
            setRole({});
            setEditingRoleId(null);
            closeModal(false);
        },
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setRole((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };
            

    return (
        <div className="bg-white rounded shadow-lg w-full mx-auto p-4 sm:p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">
                {editingRoleId ? 'Edit' : 'Add'} Role
            </h3>
            <div className="max-h-[80vh] overflow-y-auto p-4">

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 anc">

                 <div className="min-w-fit">
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" id="name" value={Role.name || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Description</label>
                    <input type="text" id="description" value={Role.description || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">CreatedAt</label>
                    <input type="text" id="createdAt" value={Role.createdAt || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
        

                {/* Actions */}
                    <div className="w-full flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            onClick={() => {
                                closeModal(false);
                                setEditingRoleId(null);
                                setRole({});
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                        >
                            {editingRoleId ? 'Update' : 'Create'}
                        </button>
                    </div>





            </form>

            </div>

        </div>
    );
};

export default CreateRoleForm;
