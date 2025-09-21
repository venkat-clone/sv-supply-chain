import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const RoleDetails = ({role}) => {

const details = [
 {label: "name", value: role?.name}  ?? "N/A",
 {label: "description", value: role?.description}  ?? "N/A",
 {label: "created At", value: role?.createdAt}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`Role – #${role?.id ?? "N/A"}`}/>
    </>
    );
};



export default RoleDetails;
