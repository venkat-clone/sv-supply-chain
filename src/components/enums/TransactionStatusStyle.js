import React from "react";

 const getTransactionStatusStyle = (status) => {
    const statusMap = {
        PENDING: 'text-green-600 bg-green-100 border border-green-600',COMPLETED: 'text-indigo-600 bg-indigo-100 border border-indigo-600',FAILED: 'text-red-600 bg-red-100 border border-red-600'
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

export default getTransactionStatusStyle;