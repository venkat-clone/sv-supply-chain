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
    { key: "driverId", label: "DriverId", type: "Int" },
    { key: "vehicleId", label: "VehicleId", type: "Int" },
    { key: "fromLocationId", label: "FromLocationId", type: "Int" },
    { key: "toLocationId", label: "ToLocationId", type: "Int" },
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
    {
      key: "deliveredAt",
      label: "DeliveredAt",
      render: (row) =>
        row.deliveredAt
          ? new Date(row.deliveredAt).toLocaleDateString()
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

  return <CreateOrderForm editOrder={Order} closeModal={setIsModalOpen} />;
};

export default OrderTable;
