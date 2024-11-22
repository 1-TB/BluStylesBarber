import React from 'react';

// Field for a form component (ex. name, phone)
const FormField = ({ label, required, children }) => {
    return (
        <div className="flex items-center">
            <label className="w-32 text-indigo-900 font-medium">
                {label}{required && <span className="text-red-500">*</span>}:
            </label>
            {children}
        </div>
    );
};

export default FormField;