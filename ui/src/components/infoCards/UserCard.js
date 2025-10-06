import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const UserDetails = ({user}) => {

const details = [
 {label: "name", value: user?.name}  ?? "N/A",
 {label: "phone", value: user?.phone}  ?? "N/A",
 {label: "role Id", value: user?.roleId}  ?? "N/A",
 {label: "address", value: user?.address}  ?? "N/A",
 {label: "created At", value: user?.createdAt}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`User – #${user?.id ?? "N/A"}`}/>
    </>
    );
};



export default UserDetails;
