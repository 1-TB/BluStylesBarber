import React, { useState, useEffect } from 'react';
import FormattedPhoneInput from '../Components/FormattedPhoneInput';
import FormattedDateInput from '../Components/FormattedDateInput';
import FormField from '../Components/FormField';

// Modal to edit client information
const EditClientModal = ({ isOpen, onClose, client, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lastVisit: '',
    nextVisit: '',
    notes: ''
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        phone: client.phone || '',
        email: client.email || '',
        lastVisit: client.lastVisit || '',
        nextVisit: client.nextVisit || '',
        notes: client.notes || ''
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold text-indigo-900 mb-6">
          EDIT CLIENT INFORMATION
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormField label="Name" required>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </FormField>

            <FormField label="Phone" required>
              <FormattedPhoneInput
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Last Visit">
              <FormattedDateInput
                name="lastVisit"
                value={formData.lastVisit}
                onChange={handleChange}
              />
            </FormField>

            <FormField label="Next Visit">
              <FormattedDateInput
                name="nextVisit"
                value={formData.nextVisit}
                onChange={handleChange}
              />
            </FormField>

            <div className="flex items-start">
              <label className="w-32 text-indigo-900 font-medium mt-2">
                Notes:
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="4"
              />
            </div>
          </div>

          <div className="flex justify-start space-x-4 mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel || onClose}
              className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;