import React from "react";

 const getOrderStatusStyle = (status) => {
    const statusMap = {
        REQUESTED: 'text-green-600 bg-green-100 border border-green-600',ASSIGNED: 'text-teal-600 bg-teal-100 border border-teal-600',ENROUTE: 'text-indigo-600 bg-indigo-100 border border-indigo-600',DELIVERED: 'text-amber-600 bg-amber-100 border border-amber-600',CANCELLED: 'text-red-600 bg-red-100 border border-red-600'
    };
    const style = statusMap[status?.toLowerCase()] || 'text-gray-600 bg-gray-100';
    return (<span className={`font-bold px-2 py-1 rounded ${style}
    border
        inline-flex items-center justify-center
        min-w-[6rem]
        whitespace-nowrap
    `}>
              {status}
            </span>)
};

export default getOrderStatusStyle;