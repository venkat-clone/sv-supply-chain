import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderApiClient } from "@/lib/api/Order";
import {
  Trash2,
  Plus,
  Package,
  ShoppingCart,
  User,
  MapPin,
  CreditCard,
} from "lucide-react";
import UserSelect from "@/components/selectors/UserSelector";
import VehicleSelect from "@/components/selectors/VehicleSelector";
import LocationSelect from "@/components/selectors/LocationSelector";
import ExtraChargeSelect from "@/components/selectors/ExtraChargeSelector";
import RoleSelect from "@/components/selectors/RoleSelector";
import OrderSelect from "@/components/selectors/OrderSelector";
import VehicleTypeSelect from "@/components/selectors/VehicleTypeSelector";

const CreateOrderForm = ({ editOrder, closeModal }) => {
  const [Order, setOrder] = useState({});
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newUser, setNewUser] = useState({});

  const [newVehicle, setNewVehicle] = useState({});

  const [newLocation, setNewLocation] = useState({});
  const [newExtraCharge, setNewExtraCharge] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editOrder) {
      setOrder(editOrder);
      setEditingOrderId(editOrder.id);
    }
  }, [editOrder]);

  const handleNewUserChange = (id, value) => {
    setNewUser((prev) => ({
      ...prev,
      [id]: id === "UserId" ? Number(value) : value,
    }));
  };

 

  const handleNewVehicleChange = (id, value) => {
    setNewVehicle((prev) => ({
      ...prev,
      [id]: id === "VehicleId" ? Number(value) : value,
    }));
  };

  

  const handleNewLocationChange = (id, value) => {
    setNewLocation((prev) => ({
      ...prev,
      [id]: id === "LocationId" ? Number(value) : value,
    }));
  };

  const handleNewExtraChargeChange = (id, value) => {
    setNewExtraCharge((prev) => ({
      ...prev,
      [id]: id === "ExtraChargeId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOrderId) {
      updateMutation.mutate({ id: editingOrderId, data: Order });
    } else {
      createMutation.mutate(Order);
    }
  };

  const createMutation = useMutation({
    mutationFn: OrderApiClient.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["Orders"]);
      setOrder({});
      closeModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => OrderApiClient.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["Orders"]);
      setOrder({});
      setEditingOrderId(null);
      closeModal(false);
    },
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setOrder((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

 
  const addUser = () => {
    if (!newUser.name || !newUser.phone || !newUser.roleId || !newUser.Role) {
      alert("Please fill all required fields");
      return;
    }

    setOrder((prev) => ({
      ...prev,
      driver: [...(prev.driver || []), newUser],
    }));
    setNewUser({});
  };

  const removeUser = (index) => {
    const updatedUsers = [...(Order.driver || [])];
    updatedUsers.splice(index, 1);
    setOrder((prev) => ({
      ...prev,
      driver: updatedUsers,
    }));
  };

  const {} = {};
  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = [...(Order.vehicle || [])];
    updatedVehicles[index] = {
      ...updatedVehicles[index],
      [field]: value,
    };
    setOrder((prev) => ({
      ...prev,
      vehicle: updatedVehicles,
    }));
  };

  const addVehicle = () => {
    if (!newVehicle.name || !newVehicle.number) {
      alert("Please fill all required fields");
      return;
    }

    setOrder((prev) => ({
      ...prev,
      vehicle: [...(prev.vehicle || []), newVehicle],
    }));
    setNewVehicle({});
  };

  const removeVehicle = (index) => {
    const updatedVehicles = [...(Order.vehicle || [])];
    updatedVehicles.splice(index, 1);
    setOrder((prev) => ({
      ...prev,
      vehicle: updatedVehicles,
    }));
  };

  const { totalVehicleCapacityTons } = {
    totalVehicleCapacityTons: (Order.vehicle || []).reduce(
      (total, item) => total + (item.capacityTons || 0),
      0
    ),
  };


  const { totalLocationLatitude, totalLocationLongitude } = {
    totalLocationLatitude: (Order.fromLocation || []).reduce(
      (total, item) => total + (item.latitude || 0),
      0
    ),
    totalLocationLongitude: (Order.fromLocation || []).reduce(
      (total, item) => total + (item.longitude || 0),
      0
    ),
  };
  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...(Order.toLocation || [])];
    updatedLocations[index] = {
      ...updatedLocations[index],
      [field]: value,
    };
    setOrder((prev) => ({
      ...prev,
      toLocation: updatedLocations,
    }));
  };

  const addLocation = () => {
    if (
      !newLocation.name ||
      !newLocation.address ||
      !newLocation.contactId ||
      !newLocation.User
    ) {
      alert("Please fill all required fields");
      return;
    }

    setOrder((prev) => ({
      ...prev,
      toLocation: [...(prev.toLocation || []), newLocation],
    }));
    setNewLocation({});
  };

  const removeLocation = (index) => {
    const updatedLocations = [...(Order.toLocation || [])];
    updatedLocations.splice(index, 1);
    setOrder((prev) => ({
      ...prev,
      toLocation: updatedLocations,
    }));
  };

  const handleExtraChargeChange = (index, field, value) => {
    const updatedExtraCharges = [...(Order.charges || [])];
    updatedExtraCharges[index] = {
      ...updatedExtraCharges[index],
      [field]: value,
    };
    setOrder((prev) => ({
      ...prev,
      charges: updatedExtraCharges,
    }));
  };

  const addExtraCharge = () => {
    if (!newExtraCharge.title || !newExtraCharge.amount) {
      alert("Please fill all required fields");
      return;
    }

    setOrder((prev) => ({
      ...prev,
      charges: [...(prev.charges || []), newExtraCharge],
    }));
    setNewExtraCharge({});
  };

  const removeExtraCharge = (index) => {
    const updatedExtraCharges = [...(Order.charges || [])];
    updatedExtraCharges.splice(index, 1);
    setOrder((prev) => ({
      ...prev,
      charges: updatedExtraCharges,
    }));
  };

  const { totalExtraChargeAmount } = {
    totalExtraChargeAmount: (Order.charges || []).reduce(
      (total, item) => total + (item.amount || 0),
      0
    ),
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Title Section */}
          <div className="flex items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {editingOrderId ? "Edit Order" : "Create New Order"}
              </h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                closeModal?.(false);
                setEditingOrderId(null);
                setOrder({});
                setNewUser({});
                setNewUser({});
                setNewVehicle({});
                setNewLocation({});
                setNewLocation({});
                setNewExtraCharge({});
              }}
              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg
                   hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 text-sm bg-green-600 text-white rounded-lg flex items-center
                   hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition-colors font-medium"
            >
              {editingOrderId ? "Update Order" : "Create Order"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 h-full flex flex-col space-y-4">
          {/* Order Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-shrink-0">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center">
                <Package className="w-4 h-4 mr-2 text-blue-600" />
                Order Information
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-700">
                    <User className="w-3 h-3 mr-1 text-gray-500" />
                    Customer
                  </label>
                  <UserSelect
                    value={Order.customerId || ""}
                    handleInputChange={handleInputChange}
                    id="customerId"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-700">
                    FromLocation
                  </label>
                  <LocationSelect
                    value={Order.fromLocationId || ""}
                    handleInputChange={handleInputChange}
                    id="fromLocationId"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-700">
                    ToLocation
                  </label>
                  <LocationSelect
                    value={Order.toLocationId || ""}
                    handleInputChange={handleInputChange}
                    id="toLocationId"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    value={Order.status || "REQUESTED"}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {[
                      "REQUESTED",
                      "ASSIGNED",
                      "ENROUTE",
                      "DELIVERED",
                      "CANCELLED",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-700">
                    LoadTons
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="loadTons"
                    value={Order.loadTons || ""}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
            {/* Add ExtraCharge Section */}
            <div className="border-b border-gray-200">
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Plus className="w-4 h-4 mr-2 text-green-600" />
                  Add ExtraCharge
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={newExtraCharge.title || ""}
                      onChange={(e) =>
                        handleNewExtraChargeChange("title", e.target.value)
                      }
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      Amount
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={newExtraCharge.amount || ""}
                      onChange={(e) =>
                        handleNewExtraChargeChange(
                          "amount",
                          Number(e.target.value)
                        )
                      }
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addExtraCharge}
                      className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ExtraCharge Table */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <h2 className="text-sm font-semibold text-gray-900">
                  ExtraCharges
                </h2>
                <div className="text-xs text-gray-500">
                  {(Order.charges || []).length} items
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                        Title
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(Order.charges || []).length > 0 ? (
                      (Order.charges || []).map((extraCharge, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-2">
                            <div className="text-sm text-gray-900">
                              {extraCharge.title || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={extraCharge.amount || 0}
                              onChange={(e) =>
                                handleExtraChargeChange(
                                  index,
                                  "amount",
                                  Number(e.target.value)
                                )
                              }
                              className="w-20 p-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeExtraCharge(index)}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-4 py-8 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <Package className="w-8 h-8 mb-2 text-gray-300" />
                            <p className="text-sm font-medium">
                              No ExtraCharges added yet
                            </p>
                            <p className="text-xs">
                              Add ExtraCharges to your order using the form
                              above
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {(Order.charges || []).length > 0 && (
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex-shrink-0">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-900">
                      ExtraCharge Summary:
                    </span>
                    <div className="flex space-x-4">
                      <span className="font-semibold text-gray-900">
                        {(Order.charges || []).length} items
                      </span>
                      {/*<span className="font-semibold text-gray-900">${totalExtraChargePrice.toFixed(2)}</span>*/}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderForm;
