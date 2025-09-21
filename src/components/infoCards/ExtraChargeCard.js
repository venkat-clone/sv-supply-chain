import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const ExtraChargeDetails = ({extracharge}) => {

const details = [
 {label: "order Id", value: extracharge?.orderId}  ?? "N/A",
 {label: "title", value: extracharge?.title}  ?? "N/A",
 {label: "amount", value: extracharge?.amount}  ?? "N/A",
 {label: "created At", value: extracharge?.createdAt}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`ExtraCharge – #${extracharge?.id ?? "N/A"}`}/>
    </>
    );
};



export default ExtraChargeDetails;
