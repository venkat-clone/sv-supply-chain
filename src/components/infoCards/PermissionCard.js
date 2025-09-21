import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const PermissionDetails = ({permission}) => {

const details = [
 {label: "action", value: permission?.action}  ?? "N/A",
 {label: "description", value: permission?.description}  ?? "N/A",
 {label: "created At", value: permission?.createdAt}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`Permission – #${permission?.id ?? "N/A"}`}/>
    </>
    );
};



export default PermissionDetails;
