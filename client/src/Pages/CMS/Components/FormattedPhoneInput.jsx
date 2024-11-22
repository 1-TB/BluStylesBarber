import React from 'react';

// Formatting for phone numbers
const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (!phoneNumber) return '';
    if (phoneNumber.length < 4) return `(${phoneNumber}`;
    if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const FormattedPhoneInput = ({ value, onChange, required = false }) => {
    const handleChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        onChange({
            target: {
                name: 'phone',
                value: formattedPhone
            }
        });
    };

    return (
        <input
            id="phone"
            type="tel"
            name="phone"
            value={value}
            onChange={handleChange}
            placeholder="(123)-456-7890"
            maxLength="14"
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required={required}
        />
    );
};

export default FormattedPhoneInput;