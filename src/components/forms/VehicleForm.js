
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VehicleApiClient } from "@/lib/api/Vehicle";
import VehicleTypeSelect from '@/components/selectors/VehicleTypeSelector';
import OrderSelect from '@/components/selectors/OrderSelector';
import UserSelect from '@/components/selectors/UserSelector';


const CreateVehicleForm = ({ editVehicle, closeModal }) => {
    const [Vehicle, setVehicle] = useState({});
    const [editingVehicleId, setEditingVehicleId] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editVehicle) {
            setVehicle(editVehicle);
            setEditingVehicleId(editVehicle.id);
        }
    }, [editVehicle]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingVehicleId) {
            updateMutation.mutate({ id: editingVehicleId, data: Vehicle });
        } else {
            createMutation.mutate(Vehicle);
        }
    };

    const createMutation = useMutation({
        mutationFn: VehicleApiClient.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['Vehicles']);
            setVehicle({});
            closeModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => VehicleApiClient.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['Vehicles']);
            setVehicle({});
            setEditingVehicleId(null);
            closeModal(false);
        },
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setVehicle((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };
            

    return (
        <div className="bg-white rounded shadow-lg w-full mx-auto p-4 sm:p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">
                {editingVehicleId ? 'Edit' : 'Add'} Vehicle
            </h3>
            <div className="max-h-[80vh] overflow-y-auto p-4">

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 anc">

                 <div className="min-w-fit">
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" id="name" value={Vehicle.name || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Number</label>
                    <input type="text" id="number" value={Vehicle.number || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">CapacityTons</label>
                    <input type="number" step="0.01" id="capacityTons" value={Vehicle.capacityTons || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Provider</label>
                    <input type="text" id="provider" value={Vehicle.provider || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Contact</label>
                    <input type="text" id="contact" value={Vehicle.contact || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">CurrentStatus</label>
                    <input type="text" id="currentStatus" value={Vehicle.currentStatus || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">CreatedAt</label>
                    <input type="text" id="createdAt" value={Vehicle.createdAt || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium flex items-center gap-2">
                        <input type="checkbox" id="owned" checked={Vehicle.owned || false} onChange={handleInputChange} />
                        Owned
                    </label>
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium flex items-center gap-2">
                        <input type="checkbox" id="isAvailable" checked={Vehicle.isAvailable || false} onChange={handleInputChange} />
                        IsAvailable
                    </label>
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Type</label>
                    <VehicleTypeSelect
                                value={Vehicle.typeId || ''}
                                handleInputChange={handleInputChange}
                                id="typeId"
                    />
                </div>
        

                {/* Actions */}
                    <div className="w-full flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            onClick={() => {
                                closeModal(false);
                                setEditingVehicleId(null);
                                setVehicle({});
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                        >
                            {editingVehicleId ? 'Update' : 'Create'}
                        </button>
                    </div>





            </form>

            </div>

        </div>
    );
};

export default CreateVehicleForm;
