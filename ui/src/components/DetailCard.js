import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const DetailCard = ({ details,title }) => {
    const [expanded, setExpanded] = useState(false);


    const visibleDetails = expanded ? details : details.slice(0, 2);

    return (
        <div
            onClick={() => setExpanded(!expanded)} // make whole card toggleable
            className="p-3 border border-gray-200 rounded-lg bg-white shadow-sm text-xs sm:text-sm cursor-pointer transition-shadow hover:shadow-md"
        >
            <h2 className="font-semibold mb-2 text-gray-800">
                {title}
            </h2>

            <div className="grid grid-cols-2 border border-gray-100 rounded-md overflow-hidden">
                {visibleDetails.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col border-b border-gray-100 p-2 hover:bg-gray-50"
                        style={{
                            borderRight:
                                idx % 2 === 0 && idx !== visibleDetails.length - 1
                                    ? "1px solid #f0f0f0"
                                    : "none",
                        }}
                    >
                        <span className="text-gray-500 text-[11px]">{item.label}</span>
                        <span className="font-medium truncate">{item.value}</span>
                    </div>
                ))}
            </div>

            {/* Visual Toggle Button (non-interactive, just display) */}
            <div className="flex justify-center mt-2 pointer-events-none">
                <div className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                    {expanded ? "Show Less" : "Show More"}
                    {expanded ? (
                        <ChevronUp size={14} />
                    ) : (
                        <ChevronDown size={14} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
