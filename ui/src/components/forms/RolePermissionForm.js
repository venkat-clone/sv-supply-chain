
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RolePermissionApiClient } from "@/lib/api/RolePermission";
import RoleSelect from '@/components/selectors/RoleSelector';
import PermissionSelect from '@/components/selectors/PermissionSelector';


const CreateRolePermissionForm = ({ editRolePermission, closeModal }) => {
    const [RolePermission, setRolePermission] = useState({});
    const [editingRolePermissionId, setEditingRolePermissionId] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editRolePermission) {
            setRolePermission(editRolePermission);
            setEditingRolePermissionId(editRolePermission.id);
        }
    }, [editRolePermission]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingRolePermissionId) {
            updateMutation.mutate({ id: editingRolePermissionId, data: RolePermission });
        } else {
            createMutation.mutate(RolePermission);
        }
    };

    const createMutation = useMutation({
        mutationFn: RolePermissionApiClient.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['RolePermissions']);
            setRolePermission({});
            closeModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => RolePermissionApiClient.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['RolePermissions']);
            setRolePermission({});
            setEditingRolePermissionId(null);
            closeModal(false);
        },
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setRolePermission((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };
            

    return (
        <div className="bg-white rounded shadow-lg w-full mx-auto p-4 sm:p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">
                {editingRolePermissionId ? 'Edit' : 'Add'} RolePermission
            </h3>
            <div className="max-h-[80vh] overflow-y-auto p-4">

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 anc">

                 <div className="min-w-fit">
                    <label className="block text-sm font-medium">Role</label>
                    <RoleSelect
                                value={RolePermission.roleId || ''}
                                handleInputChange={handleInputChange}
                                id="roleId"
                    />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Permission</label>
                    <PermissionSelect
                                value={RolePermission.permissionId || ''}
                                handleInputChange={handleInputChange}
                                id="permissionId"
                    />
                </div>
        

                {/* Actions */}
                    <div className="w-full flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            onClick={() => {
                                closeModal(false);
                                setEditingRolePermissionId(null);
                                setRolePermission({});
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                        >
                            {editingRolePermissionId ? 'Update' : 'Create'}
                        </button>
                    </div>





            </form>

            </div>

        </div>
    );
};

export default CreateRolePermissionForm;
