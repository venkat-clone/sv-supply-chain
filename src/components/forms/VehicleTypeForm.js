
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VehicleTypeApiClient } from "@/lib/api/VehicleType";
import VehicleSelect from '@/components/selectors/VehicleSelector';


const CreateVehicleTypeForm = ({ editVehicleType, closeModal }) => {
    const [VehicleType, setVehicleType] = useState({});
    const [editingVehicleTypeId, setEditingVehicleTypeId] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editVehicleType) {
            setVehicleType(editVehicleType);
            setEditingVehicleTypeId(editVehicleType.id);
        }
    }, [editVehicleType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingVehicleTypeId) {
            updateMutation.mutate({ id: editingVehicleTypeId, data: VehicleType });
        } else {
            createMutation.mutate(VehicleType);
        }
    };

    const createMutation = useMutation({
        mutationFn: VehicleTypeApiClient.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['VehicleTypes']);
            setVehicleType({});
            closeModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => VehicleTypeApiClient.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['VehicleTypes']);
            setVehicleType({});
            setEditingVehicleTypeId(null);
            closeModal(false);
        },
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setVehicleType((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };
            

    return (
        <div className="bg-white rounded shadow-lg w-full mx-auto p-4 sm:p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">
                {editingVehicleTypeId ? 'Edit' : 'Add'} VehicleType
            </h3>
            <div className="max-h-[80vh] overflow-y-auto p-4">

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 anc">

                 <div className="min-w-fit">
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" id="name" value={VehicleType.name || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">MinLoadCapacity</label>
                    <input type="number" step="0.01" id="minLoadCapacity" value={VehicleType.minLoadCapacity || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">MaxLoadCapacity</label>
                    <input type="number" step="0.01" id="maxLoadCapacity" value={VehicleType.maxLoadCapacity || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">MinDistance</label>
                    <input type="number" step="0.01" id="minDistance" value={VehicleType.minDistance || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">MaxDistance</label>
                    <input type="number" step="0.01" id="maxDistance" value={VehicleType.maxDistance || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Description</label>
                    <input type="text" id="description" value={VehicleType.description || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
        

                {/* Actions */}
                    <div className="w-full flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            onClick={() => {
                                closeModal(false);
                                setEditingVehicleTypeId(null);
                                setVehicleType({});
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                        >
                            {editingVehicleTypeId ? 'Update' : 'Create'}
                        </button>
                    </div>





            </form>

            </div>

        </div>
    );
};

export default CreateVehicleTypeForm;
