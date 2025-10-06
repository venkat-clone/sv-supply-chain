import React from 'react';
import AsyncSelect from 'react-select/async';
import { ExtraChargeApiClient } from '@/lib/api/ExtraCharge'; // adjust the import as needed

const ExtraChargeSelect = ({ value, handleInputChange,id }) => {
    const loadOptions = async (inputValue, callback) => {
        try {
            const data = await ExtraChargeApiClient.getAll({
                page: 1,
                limit: 10,
                filters: { search: inputValue },
            });

            const options = data?.data?.map(ExtraCharge => ({
                value: ExtraCharge.id,
                label: `#${ExtraCharge.id} ${ExtraCharge.title}, ${ExtraCharge.amount} `,
                ExtraCharge:ExtraCharge
            })) || [];

            callback(options);
        } catch (error) {
            console.error('Failed to load ExtraCharges', error);
            callback([]);
        }
    };

    const handleChange = (selectedOption) => {
        handleInputChange({
            target: {
                value: selectedOption ? selectedOption.value : '',
                id,
                ExtraCharge: selectedOption ? selectedOption.ExtraCharge : null,
            },
        });
    };

    return (
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            isClearable
            onChange={handleChange}
            value={value ? { value: value, label: `ExtraCharge #${value}` } : null}
            placeholder="Select a ExtraCharge..."
            styles={{
                control: (base, state) => ({
                    ...base,
                    minHeight: '30px',
                     width:'200px',
                    height: '30px',
                    borderRadius: '0.25rem', // Tailwind's rounded
                    borderColor: state.isFocused ? '#4ade80' : '#d1d5db',
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: '#9ca3af', // gray-300 on hover
                    },
                }),
                valueContainer: (base) => ({
                    ...base,
                    height: '30px',
                    padding: '0 0.75rem',
                    width:'200px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }),
                indicatorsContainer: (base) => ({
                    ...base,
                    height: '30px',
                }),
            }}
        />
    );
};

export default ExtraChargeSelect;
