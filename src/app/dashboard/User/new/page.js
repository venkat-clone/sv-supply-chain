"use client";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserApiClient } from "@/lib/api/User";
import TableComponent from "@/components/TableComponent";
import CreateUserForm from "@/components/forms/UserForm";
import { useRouter } from "next/navigation";
import RoleSelect from "@/components/selectors/RoleSelector";
import OrderSelect from "@/components/selectors/OrderSelector";
import VehicleSelect from "@/components/selectors/VehicleSelector";
import LocationSelect from "@/components/selectors/LocationSelector";

const UserTable = () => {
  const [User, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isModalOpen) {
      setUser({});
    }
  }, [isModalOpen]);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => UserApiClient.delete(id),
    onSuccess: () => queryClient.invalidateQueries(["Users"]),
  });

  const headers = [
    { key: "id", label: "Id", type: "Int" },
    { key: "name", label: "Name", type: "String" },
    { key: "phone", label: "Phone", type: "String" },
    { key: "roleId", label: "RoleId", type: "Int" },
    { key: "address", label: "Address", type: "String" },
    {
      key: "createdAt",
      label: "CreatedAt",
      render: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      type: "date",
    },
  ];

  const handleEditRow = (row) => {
    setUser(row);
    setIsModalOpen(true);
  };

  return <CreateUserForm editUser={User} closeModal={setIsModalOpen} />;
};

export default UserTable;
