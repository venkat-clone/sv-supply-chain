import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ColumnFilterInput = ({ header, columnFilters, setColumnFilters, clearFilter }) => {
    const { key, type, values, label } = header;

    const hasFilterValue =
        columnFilters[key] &&
        (type === 'string' || type === 'boolean' || type === 'enum'
            ? columnFilters[key] !== ''
            : columnFilters[key]?.operator || columnFilters[key]?.value);

    const handleInputChange = (value) => {
        setColumnFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const renderClearButton = () =>
        hasFilterValue && (
            <button
                onClick={() => clearFilter(key)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Clear filter"
            >
                <FaTimes size={14} />
            </button>
        );

    // Common styles
    const inputClass =
        "w-full p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 placeholder-gray-400";
    const selectClass =
        "p-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-600";

    return (
        <div className="mt-2 relative">
            {/* String */}
            {type === 'String' && (
                <div className="relative">
                    <input
                        type="text"
                        className={inputClass}
                        placeholder={`Search ${label}`}
                        value={columnFilters[key] || ''}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    {renderClearButton()}
                </div>
            )}

            {/* Integer */}
            {type === 'Int' && (
                <div className="flex gap-2">
                    <select
                        className={`${selectClass} w-20 text-center`}
                        value={columnFilters[key]?.operator || ''}
                        onChange={(e) =>
                            handleInputChange({
                                ...columnFilters[key],
                                operator: e.target.value,
                            })
                        }
                    >
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value=">=">&ge;</option>
                        <option value="<=">&le;</option>
                        <option value="!=">&ne;</option>
                        <option value="=">=</option>
                        <option value="in">in</option>
                    </select>

                    <div className="relative flex-1">
                        <input
                            type="text"
                            className={inputClass}
                            placeholder={columnFilters[key]?.operator === 'in' ? 'e.g., 1,2,3' : 'Value'}
                            value={columnFilters[key]?.value || ''}
                            onChange={(e) =>
                                handleInputChange({
                                    ...columnFilters[key],
                                    value: e.target.value,
                                })
                            }
                        />
                        {renderClearButton()}
                    </div>
                </div>
            )}

            {/* Boolean */}
            {type === 'boolean' && (
                <div className="relative">
                    <select
                        className={inputClass}
                        value={columnFilters[key] || ''}
                        onChange={(e) => handleInputChange(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                        <option value="null">Null</option>
                        <option value="notnull">Not Null</option>
                    </select>
                    {renderClearButton()}
                </div>
            )}

            {/* Date */}
            {type === 'date' && (
                <div className="flex gap-2">
                    <select
                        className={`${selectClass} w-20 text-center`}
                        value={columnFilters[key]?.operator || ''}
                        onChange={(e) =>
                            handleInputChange({
                                ...columnFilters[key],
                                operator: e.target.value,
                            })
                        }
                    >
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value="=">=</option>
                        <option value="between">⇄</option>
                    </select>

                    <div className="relative flex-1">
                        {columnFilters[key]?.operator === 'between' ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="Start YYYY-MM-DD"
                                    value={columnFilters[key]?.value?.start || ''}
                                    onChange={(e) =>
                                        handleInputChange({
                                            ...columnFilters[key],
                                            value: {
                                                ...columnFilters[key]?.value,
                                                start: e.target.value,
                                            },
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="End YYYY-MM-DD"
                                    value={columnFilters[key]?.value?.end || ''}
                                    onChange={(e) =>
                                        handleInputChange({
                                            ...columnFilters[key],
                                            value: {
                                                ...columnFilters[key]?.value,
                                                end: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="YYYY-MM-DD"
                                value={columnFilters[key]?.value || ''}
                                onChange={(e) =>
                                    handleInputChange({
                                        ...columnFilters[key],
                                        value: e.target.value,
                                    })
                                }
                            />
                        )}
                        {renderClearButton()}
                    </div>
                </div>
            )}

            {/* Enum */}
            {type === 'enum' && (
                <div className="relative">
                    <select
                        className={inputClass}
                        value={columnFilters[key] || ''}
                        onChange={(e) => handleInputChange(e.target.value)}
                    >
                        <option value="">All</option>
                        {values?.map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                        <option value="null">Null</option>
                        <option value="notnull">Not Null</option>
                    </select>
                    {renderClearButton()}
                </div>
            )}
        </div>
    );
};

export default ColumnFilterInput;
