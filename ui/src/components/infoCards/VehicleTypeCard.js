import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const VehicleTypeDetails = ({vehicletype}) => {

const details = [
 {label: "name", value: vehicletype?.name}  ?? "N/A",
 {label: "min Load Capacity", value: vehicletype?.minLoadCapacity}  ?? "N/A",
 {label: "max Load Capacity", value: vehicletype?.maxLoadCapacity}  ?? "N/A",
 {label: "min Distance", value: vehicletype?.minDistance}  ?? "N/A",
 {label: "max Distance", value: vehicletype?.maxDistance}  ?? "N/A",
 {label: "description", value: vehicletype?.description}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`VehicleType – #${vehicletype?.id ?? "N/A"}`}/>
    </>
    );
};



export default VehicleTypeDetails;
