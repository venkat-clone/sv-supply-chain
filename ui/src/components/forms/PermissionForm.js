import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionApiClient } from "@/lib/api/Permission";
import RolePermissionSelect from "@/components/selectors/RolePermissionSelector";

const CreatePermissionForm = ({ editPermission, closeModal }) => {
  const [Permission, setPermission] = useState({});
  const [editingPermissionId, setEditingPermissionId] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editPermission) {
      setPermission(editPermission);
      setEditingPermissionId(editPermission.id);
    }
  }, [editPermission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPermissionId) {
      updateMutation.mutate({ id: editingPermissionId, data: Permission });
    } else {
      createMutation.mutate(Permission);
    }
  };

  const createMutation = useMutation({
    mutationFn: PermissionApiClient.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["Permissions"]);
      setPermission({});
      closeModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => PermissionApiClient.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["Permissions"]);
      setPermission({});
      setEditingPermissionId(null);
      closeModal(false);
    },
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setPermission((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const getParsedString = (e) => {
    e.target.value = e.target.value.toLowerCase().replace(/[^a-z-]/g, "-");
    return e;
  };

  return (
    <div className="bg-white rounded shadow-lg w-full mx-auto p-4 sm:p-6 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-6 text-center">
        {editingPermissionId ? "Edit" : "Add"} Permission
      </h3>
      <div className="max-h-[80vh] overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 anc">
          <div className="min-w-fit">
            <label className="block text-sm font-medium">Action</label>
            <input
              type="text"
              id="action"
              value={Permission.action || ""}
              onChange={(e) => handleInputChange(getParsedString(e))}
              className="w-full p-2 border rounded mb-4"
            />
          </div>
          <div className="min-w-fit">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              id="description"
              value={Permission.description || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />
          </div>

          {/* Actions */}
          <div className="w-full flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              onClick={() => {
                closeModal(false);
                setEditingPermissionId(null);
                setPermission({});
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
            >
              {editingPermissionId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePermissionForm;
