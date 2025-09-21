import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const VehicleDetails = ({vehicle}) => {

const details = [
 {label: "name", value: vehicle?.name}  ?? "N/A",
 {label: "number", value: vehicle?.number}  ?? "N/A",
 {label: "type Id", value: vehicle?.typeId}  ?? "N/A",
 {label: "capacity Tons", value: vehicle?.capacityTons}  ?? "N/A",
 {label: "owned", value: vehicle?.owned}  ?? "N/A",
 {label: "is Available", value: vehicle?.isAvailable}  ?? "N/A",
 {label: "provider", value: vehicle?.provider}  ?? "N/A",
 {label: "contact", value: vehicle?.contact}  ?? "N/A",
 {label: "current Status", value: vehicle?.currentStatus}  ?? "N/A",
 {label: "created At", value: vehicle?.createdAt}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`Vehicle – #${vehicle?.id ?? "N/A"}`}/>
    </>
    );
};



export default VehicleDetails;
