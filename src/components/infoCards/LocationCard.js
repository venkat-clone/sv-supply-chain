import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const LocationDetails = ({location}) => {

const details = [
 {label: "name", value: location?.name}  ?? "N/A",
 {label: "address", value: location?.address}  ?? "N/A",
 {label: "pincode", value: location?.pincode}  ?? "N/A",
 {label: "latitude", value: location?.latitude}  ?? "N/A",
 {label: "longitude", value: location?.longitude}  ?? "N/A",
 {label: "contact Id", value: location?.contactId}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`Location – #${location?.id ?? "N/A"}`}/>
    </>
    );
};



export default LocationDetails;
