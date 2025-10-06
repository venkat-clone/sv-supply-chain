import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserApiClient } from "@/lib/api/User";
import {
  Trash2,
  Plus,
  Package,
  ShoppingCart,
  User,
  MapPin,
  CreditCard,
} from "lucide-react";
import RoleSelect from "@/components/selectors/RoleSelector";
import OrderSelect from "@/components/selectors/OrderSelector";
import VehicleSelect from "@/components/selectors/VehicleSelector";
import LocationSelect from "@/components/selectors/LocationSelector";
import UserSelect from "@/components/selectors/UserSelector";
import RolePermissionSelect from "@/components/selectors/RolePermissionSelector";
import VehicleTypeSelect from "@/components/selectors/VehicleTypeSelector";

const CreateUserForm = ({ editUser, closeModal }) => {
  const [User, setUser] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState({});
  const [newVehicle, setNewVehicle] = useState({});
  const [newLocation, setNewLocation] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
      setEditingUserId(editUser.id);
    }
  }, [editUser]);

  const handleNewRoleChange = (id, value) => {
    setNewRole((prev) => ({
      ...prev,
      [id]: id === "RoleId" ? Number(value) : value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUserId) {
      updateMutation.mutate({ id: editingUserId, data: User });
    } else {
      createMutation.mutate(User);
    }
  };

  const createMutation = useMutation({
    mutationFn: UserApiClient.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["Users"]);
      setUser({});
      closeModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => UserApiClient.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["Users"]);
      setUser({});
      setEditingUserId(null);
      closeModal(false);
    },
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (index, field, value) => {
    const updatedRoles = [...(User.role || [])];
    updatedRoles[index] = {
      ...updatedRoles[index],
      [field]: value,
    };
    setUser((prev) => ({
      ...prev,
      role: updatedRoles,
    }));
  };

  const addRole = () => {
    if (!newRole.name) {
      alert("Please fill all required fields");
      return;
    }

    setUser((prev) => ({
      ...prev,
      role: [...(prev.role || []), newRole],
    }));
    setNewRole({});
  };

  const removeRole = (index) => {
    const updatedRoles = [...(User.role || [])];
    updatedRoles.splice(index, 1);
    setUser((prev) => ({
      ...prev,
      role: updatedRoles,
    }));
  };

  const {} = {};
  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = [...(User.vehicle || [])];
    updatedVehicles[index] = {
      ...updatedVehicles[index],
      [field]: value,
    };
    setUser((prev) => ({
      ...prev,
      vehicle: updatedVehicles,
    }));
  };

  const addVehicle = () => {
    if (!newVehicle.name || !newVehicle.number) {
      alert("Please fill all required fields");
      return;
    }

    setUser((prev) => ({
      ...prev,
      vehicle: [...(prev.vehicle || []), newVehicle],
    }));
    setNewVehicle({});
  };

  const removeVehicle = (index) => {
    const updatedVehicles = [...(User.vehicle || [])];
    updatedVehicles.splice(index, 1);
    setUser((prev) => ({
      ...prev,
      vehicle: updatedVehicles,
    }));
  };

  const { totalVehicleCapacityTons } = {
    totalVehicleCapacityTons: (User.vehicle || []).reduce(
      (total, item) => total + (item.capacityTons || 0),
      0
    ),
  };
  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...(User.Location || [])];
    updatedLocations[index] = {
      ...updatedLocations[index],
      [field]: value,
    };
    setUser((prev) => ({
      ...prev,
      Location: updatedLocations,
    }));
  };

  const addLocation = () => {
    if (!newLocation.name || !newLocation.address) {
      alert("Please fill all required fields");
      return;
    }

    setUser((prev) => ({
      ...prev,
      Location: [...(prev.Location || []), newLocation],
    }));
    setNewLocation({});
  };

  const removeLocation = (index) => {
    const updatedLocations = [...(User.Location || [])];
    updatedLocations.splice(index, 1);
    setUser((prev) => ({
      ...prev,
      Location: updatedLocations,
    }));
  };

  const { totalLocationLatitude, totalLocationLongitude } = {
    totalLocationLatitude: (User.Location || []).reduce(
      (total, item) => total + (item.latitude || 0),
      0
    ),
    totalLocationLongitude: (User.Location || []).reduce(
      (total, item) => total + (item.longitude || 0),
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
                {editingUserId ? "Edit User" : "Create New User"}
              </h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                closeModal?.(false);
                setEditingUserId(null);
                setUser({});
                setNewRole({});
                setNewVehicle({});
                setNewLocation({});
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
              {editingUserId ? "Update User" : "Create User"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 h-full flex flex-col space-y-4">
          {/* User Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-shrink-0">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900 flex items-center">
                <Package className="w-4 h-4 mr-2 text-blue-600" />
                User Information
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-700">
                    Role
                  </label>
                  <RoleSelect
                    value={User.roleId || ""}
                    handleInputChange={handleInputChange}
                    id="roleId"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={User.name || ""}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-xs font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={User.phone || ""}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
            {/* Add Vehicle Section */}
            <div className="border-b border-gray-200">
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center">
                  <Plus className="w-4 h-4 mr-2 text-green-600" />
                  Add Vehicle
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newVehicle.name || ""}
                      onChange={(e) =>
                        handleNewVehicleChange("name", e.target.value)
                      }
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">
                      Number
                    </label>
                    <input
                      type="text"
                      placeholder="Number"
                      value={newVehicle.number || ""}
                      onChange={(e) =>
                        handleNewVehicleChange("number", e.target.value)
                      }
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addVehicle}
                      className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Table */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <h2 className="text-sm font-semibold text-gray-900">
                  Vehicles
                </h2>
                <div className="text-xs text-gray-500">
                  {(User.vehicle || []).length} items
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                        Number
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(User.vehicle || []).length > 0 ? (
                      (User.vehicle || []).map((vehicle, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-2">
                            <div className="text-sm text-gray-900">
                              {vehicle.name || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-gray-900">
                              {vehicle.number || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-gray-900">
                              {vehicle.VehicleType?.name || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-xs text-gray-600 max-w-xs truncate">
                              {vehicle.VehicleType?.description || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="text-sm text-gray-900">
                              {vehicle.User?.name || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeVehicle(index)}
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
                        <td colSpan="6" className="px-4 py-8 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <Package className="w-8 h-8 mb-2 text-gray-300" />
                            <p className="text-sm font-medium">
                              No Vehicles added yet
                            </p>
                            <p className="text-xs">
                              Add Vehicles to your user using the form above
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {(User.vehicle || []).length > 0 && (
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 flex-shrink-0">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-900">
                      Vehicle Summary:
                    </span>
                    <div className="flex space-x-4">
                      <span className="font-semibold text-gray-900">
                        {(User.vehicle || []).length} items
                      </span>
                      {/*<span className="font-semibold text-gray-900">${totalVehiclePrice.toFixed(2)}</span>*/}
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

export default CreateUserForm;
