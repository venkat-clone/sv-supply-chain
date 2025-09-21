import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";
import getOrderStatusStyle from '@/components/enums/OrderStatusStyle'; 
import getTransactionStatusStyle from '@/components/enums/TransactionStatusStyle'; 

const OrderDetails = ({order}) => {

const details = [
 {label: "customer Id", value: order?.customerId}  ?? "N/A",
 {label: "driver Id", value: order?.driverId}  ?? "N/A",
 {label: "vehicle Id", value: order?.vehicleId}  ?? "N/A",
 {label: "from Location Id", value: order?.fromLocationId}  ?? "N/A",
 {label: "to Location Id", value: order?.toLocationId}  ?? "N/A",
 {label: "load Tons", value: order?.loadTons}  ?? "N/A",
 {label: "estimated Distance", value: order?.estimatedDistance}  ?? "N/A",
 {label: "traveled Distance", value: order?.traveledDistance}  ?? "N/A",
 {label: "extra Distance", value: order?.extraDistance}  ?? "N/A",
 {label: "total Charge", value: order?.totalCharge}  ?? "N/A",
 {label: "requested At", value: order?.requestedAt}  ?? "N/A",
 {label: "delivered At", value: order?.deliveredAt}  ?? "N/A",
 {label: "status", value: order?.status}  ?? "N/A",
 {label: "transaction Status", value: order?.transactionStatus}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`Order – #${order?.id ?? "N/A"}`}/>
    </>
    );
};



export default OrderDetails;
