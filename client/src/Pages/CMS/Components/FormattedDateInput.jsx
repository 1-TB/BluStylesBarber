import React from 'react';

// Formatting for date forms
const formatDate = (value) => {
    const date = value.replace(/\D/g, '');
    if (!date) return '';
    if (date.length < 3) return date;
    if (date.length < 5) return `${date.slice(0, 2)}-${date.slice(2)}`;
    return `${date.slice(0, 2)}-${date.slice(2, 4)}-${date.slice(4, 8)}`;
};

const FormattedDateInput = ({ value, onChange, name }) => {
    const handleChange = (e) => {
        const formattedDate = formatDate(e.target.value);
        onChange({
            target: {
                name: name,
                value: formattedDate
            }
        });
    };

    return (
        <input
            id={name}
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            placeholder="MM-DD-YYYY"
            maxLength="10"
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
    );
};

export default FormattedDateInput;