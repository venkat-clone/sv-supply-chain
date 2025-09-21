'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {notFound} from 'next/navigation';
import {RolePermissionApiClient} from "@/lib/api/RolePermission";

import TableComponent from "@/components/TableComponent";

import RolePermissionDetails from '@/components/infoCards/RolePermissionCard';
import RoleDetails from '@/components/infoCards/RoleCard';
import PermissionDetails from '@/components/infoCards/PermissionCard';

export default function RolePermissionDetailsPage() {
    const { id } = useParams();

    const {
        data: rolepermission,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['RolePermissionDetails', id],
        queryFn: () => RolePermissionApiClient.getById(id),
        enabled: !!id,
    });

    

    if (isLoading) return <p className="p-4">Loading rolepermission...</p>;
    if (isError) return <p className="p-4 text-red-500">Error: {error.message}</p>;
     if (!rolepermission) {
        notFound();
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">RolePermission Details - #{rolepermission.id}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

            <RolePermissionDetails rolepermission={rolepermission}/>
            <RoleDetails role={rolepermission.role}/>
<PermissionDetails permission={rolepermission.permission}/>
            </div>
            


        </div>
    );
}
