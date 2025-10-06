
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LocationApiClient } from "@/lib/api/Location";
import UserSelect from '@/components/selectors/UserSelector';
import OrderSelect from '@/components/selectors/OrderSelector';


const CreateLocationForm = ({ editLocation, closeModal }) => {
    const [Location, setLocation] = useState({});
    const [editingLocationId, setEditingLocationId] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editLocation) {
            setLocation(editLocation);
            setEditingLocationId(editLocation.id);
        }
    }, [editLocation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingLocationId) {
            updateMutation.mutate({ id: editingLocationId, data: Location });
        } else {
            createMutation.mutate(Location);
        }
    };

    const createMutation = useMutation({
        mutationFn: LocationApiClient.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['Locations']);
            setLocation({});
            closeModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => LocationApiClient.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['Locations']);
            setLocation({});
            setEditingLocationId(null);
            closeModal(false);
        },
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setLocation((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };
            

    return (
        <div className="bg-white rounded shadow-lg w-full mx-auto p-4 sm:p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">
                {editingLocationId ? 'Edit' : 'Add'} Location
            </h3>
            <div className="max-h-[80vh] overflow-y-auto p-4">

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 anc">

                 <div className="min-w-fit">
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" id="name" value={Location.name || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Address</label>
                    <input type="text" id="address" value={Location.address || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Pincode</label>
                    <input type="text" id="pincode" value={Location.pincode || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Latitude</label>
                    <input type="number" step="0.01" id="latitude" value={Location.latitude || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Longitude</label>
                    <input type="number" step="0.01" id="longitude" value={Location.longitude || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Contact</label>
                    <UserSelect
                                value={Location.contactId || ''}
                                handleInputChange={handleInputChange}
                                id="contactId"
                    />
                </div>
        

                {/* Actions */}
                    <div className="w-full flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            onClick={() => {
                                closeModal(false);
                                setEditingLocationId(null);
                                setLocation({});
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                        >
                            {editingLocationId ? 'Update' : 'Create'}
                        </button>
                    </div>





            </form>

            </div>

        </div>
    );
};

export default CreateLocationForm;
