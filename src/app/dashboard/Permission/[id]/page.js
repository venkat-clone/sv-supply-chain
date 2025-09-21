'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {PermissionApiClient} from "@/lib/api/Permission";

import TableComponent from "@/components/TableComponent";
import { RolePermissionApiClient } from '@/lib/api/RolePermission';
import PermissionDetails from '@/components/infoCards/PermissionCard';


export default function PermissionDetailsPage() {
    const { id } = useParams();

    const {
        data: permission,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['PermissionDetails', id],
        queryFn: () => PermissionApiClient.getById(id),
        enabled: !!id,
    });

                const rolepermissionHeaders = [
            { key: 'id', label: 'Id',type: 'Int' },
{ key: 'roleId', label: 'RoleId',type: 'Int' },
{ key: 'permissionId', label: 'PermissionId',type: 'Int' }
            ];

    if (isLoading) return <p className="p-4">Loading permission...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!permission) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Permission Details - #{permission.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <PermissionDetails permission={permission}/>
            
            </div>
            <TableComponent
    tableKey="Permission-roles"
    getAllFn={RolePermissionApiClient.getAll}
    headers={rolepermissionHeaders}
    redirect="/dashboard/RolePermission"
    title="Roles"
    defaultFilters={{
        permissionId: `=${permission.id}`
    }}

/>


        </div>
    );
}
