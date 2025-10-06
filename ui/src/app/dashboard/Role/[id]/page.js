"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { RoleApiClient } from "@/lib/api/Role";

import TableComponent from "@/components/TableComponent";
import { UserApiClient } from "@/lib/api/User";
import { RolePermissionApiClient } from "@/lib/api/RolePermission";
import RoleDetails from "@/components/infoCards/RoleCard";
import CreateRolePermissionForm from "@/components/forms/RolePermissionForm";

export default function RoleDetailsPage() {
  const { id } = useParams();
  const [RolePermission, setRolePermission] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if(!isModalOpen){
            setRolePermission({});
        }
    }, [isModalOpen]);
  const {
    data: role,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["RoleDetails", id],
    queryFn: () => RoleApiClient.getById(id),
    enabled: !!id,
  });

  const userHeaders = [
    { key: "id", label: "Id", type: "Int" },
    { key: "name", label: "Name", type: "String" },
    { key: "phone", label: "Phone", type: "String" },
    { key: "roleId", label: "RoleId", type: "Int" },
    { key: "address", label: "Address", type: "String" },
  ];
  const rolepermissionHeaders = [
    { key: "id", label: "Id", type: "Int" },
    { key: "roleId", label: "RoleId", type: "Int" },
    { key: "permissionId", label: "PermissionId", type: "Int" },
  ];

  if (isLoading) return <p className="p-4">Loading role...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;
  if (!role) {
    notFound();
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          RolePermission - #{role.id}
        </h2>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-lg">+</span> Add RolePermission
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <RoleDetails role={role} />
      </div>
      <TableComponent
        tableKey="Role-users"
        getAllFn={UserApiClient.getAll}
        headers={userHeaders}
        redirect="/dashboard/User"
        title="Users"
        defaultFilters={{
          roleId: `=${role.id}`,
        }}
      />
      <TableComponent
        tableKey="Role-permissions"
        getAllFn={RolePermissionApiClient.getAll}
        headers={rolepermissionHeaders}
        redirect="/dashboard/RolePermission"
        title="Permissions"
        defaultFilters={{
          roleId: `=${role.id}`,
        }}
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="max-w-xl">
            <CreateRolePermissionForm
              editRolePermission={RolePermission}
              closeModal={setIsModalOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
