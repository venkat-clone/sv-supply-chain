import React from 'react';
import { formatDate } from '@/utils/date';
import DetailCard from "@/components/DetailCard";


const RolePermissionDetails = ({rolepermission}) => {

const details = [
 {label: "role Id", value: rolepermission?.roleId}  ?? "N/A",
 {label: "permission Id", value: rolepermission?.permissionId}  ?? "N/A"

    ];
    return (
    <>
     <DetailCard details={details} title={`RolePermission – #${rolepermission?.id ?? "N/A"}`}/>
    </>
    );
};



export default RolePermissionDetails;
