
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExtraChargeApiClient } from "@/lib/api/ExtraCharge";
import OrderSelect from '@/components/selectors/OrderSelector';


const CreateExtraChargeForm = ({ editExtraCharge, closeModal }) => {
    const [ExtraCharge, setExtraCharge] = useState({});
    const [editingExtraChargeId, setEditingExtraChargeId] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (editExtraCharge) {
            setExtraCharge(editExtraCharge);
            setEditingExtraChargeId(editExtraCharge.id);
        }
    }, [editExtraCharge]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExtraChargeId) {
            updateMutation.mutate({ id: editingExtraChargeId, data: ExtraCharge });
        } else {
            createMutation.mutate(ExtraCharge);
        }
    };

    const createMutation = useMutation({
        mutationFn: ExtraChargeApiClient.create,
        onSuccess: () => {
            queryClient.invalidateQueries(['ExtraCharges']);
            setExtraCharge({});
            closeModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => ExtraChargeApiClient.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['ExtraCharges']);
            setExtraCharge({});
            setEditingExtraChargeId(null);
            closeModal(false);
        },
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setExtraCharge((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };
            

    return (
        <div className="bg-white rounded shadow-lg w-full mx-auto p-4 sm:p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">
                {editingExtraChargeId ? 'Edit' : 'Add'} ExtraCharge
            </h3>
            <div className="max-h-[80vh] overflow-y-auto p-4">

            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 anc">

                 <div className="min-w-fit">
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" id="title" value={ExtraCharge.title || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Amount</label>
                    <input type="number" step="0.01" id="amount" value={ExtraCharge.amount || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">CreatedAt</label>
                    <input type="text" id="createdAt" value={ExtraCharge.createdAt || ''} onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-4" />
                </div>
<div className="min-w-fit">
                    <label className="block text-sm font-medium">Order</label>
                    <OrderSelect
                                value={ExtraCharge.orderId || ''}
                                handleInputChange={handleInputChange}
                                id="orderId"
                    />
                </div>
        

                {/* Actions */}
                    <div className="w-full flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            onClick={() => {
                                closeModal(false);
                                setEditingExtraChargeId(null);
                                setExtraCharge({});
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                        >
                            {editingExtraChargeId ? 'Update' : 'Create'}
                        </button>
                    </div>





            </form>

            </div>

        </div>
    );
};

export default CreateExtraChargeForm;
