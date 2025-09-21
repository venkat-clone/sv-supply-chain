"use client";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderApiClient } from "@/lib/api/Order";
import TableComponent from "@/components/TableComponent";
import CreateOrderForm from "@/components/forms/OrderForm";
import { useRouter } from "next/navigation";
import UserSelect from "@/components/selectors/UserSelector";
import VehicleSelect from "@/components/selectors/VehicleSelector";
import LocationSelect from "@/components/selectors/LocationSelector";
import ExtraChargeSelect from "@/components/selectors/ExtraChargeSelector";
import getOrderStatusStyle from "@/components/enums/OrderStatusStyle";
import getTransactionStatusStyle from "@/components/enums/TransactionStatusStyle";

const OrderTable = () => {
  const [Order, setOrder] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isModalOpen) {
      setOrder({});
    }
  }, [isModalOpen]);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => OrderApiClient.delete(id),
    onSuccess: () => queryClient.invalidateQueries(["Orders"]),
  });

  const headers = [
    { key: "id", label: "Id", type: "Int" },
    { key: "customerId", label: "CustomerId", type: "Int" },
    { key: "loadTons", label: "LoadTons", type: "Float" },
    {
      key: "status",
      label: "status",
      type: "enum",
      render: (row) => getOrderStatusStyle(row.status),
      values: ["REQUESTED", "ASSIGNED", "ENROUTE", "DELIVERED", "CANCELLED"],
    },
    { key: "estimatedDistance", label: "EstimatedDistance", type: "Float" },
    { key: "traveledDistance", label: "TraveledDistance", type: "Float" },
    { key: "extraDistance", label: "ExtraDistance", type: "Float" },
    {
      key: "requestedAt",
      label: "RequestedAt",
      render: (row) =>
        row.requestedAt
          ? new Date(row.requestedAt).toLocaleDateString()
          : "N/A",
      type: "date",
    },
    { key: "totalCharge", label: "TotalCharge", type: "Float" },
    {
      key: "transactionStatus",
      label: "transaction Status",
      type: "enum",
      render: (row) => getTransactionStatusStyle(row.transactionStatus),
      values: ["PENDING", "COMPLETED", "FAILED"],
    },
  ];

  const handleEditRow = (row) => {
    setOrder(row);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
            onClick={() => router.push("/dashboard/Order/new")}
          >
            <span className="text-lg">+</span> Add Order
          </button>
        </div>
      </div>

      <TableComponent
        key="Orders"
        deleteMutation={deleteMutation.mutate}
        getAllFn={OrderApiClient.getAll}
        headers={headers}
        onEditRow={handleEditRow}
        redirect="/dashboard/Order"
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="max-w-xl">
            <CreateOrderForm editOrder={Order} closeModal={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
