import React, { useState, useEffect } from 'react';
import FormattedPhoneInput from '../Components/FormattedPhoneInput';
import { Dialog } from '../Components/ui/dialog';
import { DialogContent } from '../Components/ui/dialog';
import { DialogHeader } from '../Components/ui/dialog';
import { DialogTitle } from '../Components/ui/dialog';
import { Input } from '../Components/ui/input';
import { Button } from '../Components/ui/button';

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-indigo-900">Edit Client Information</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-gray-900"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <FormattedPhoneInput
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-900"
                required
              />
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="lastVisit" className="block text-sm font-medium text-gray-700">
                  Last Visit
                </label>
                <Input
                  id="lastVisit"
                  name="lastVisit"
                  type="date"
                  value={formData.lastVisit}
                  onChange={handleChange}
                  className="text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="nextVisit" className="block text-sm font-medium text-gray-700">
                  Next Visit
                </label>
                <Input
                  id="nextVisit"
                  name="nextVisit"
                  type="date"
                  value={formData.nextVisit}
                  onChange={handleChange}
                  className="text-gray-900"
                />
              </div>
            </div>

            {/* Notes Field */}
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="4"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel || onClose}
              className="text-gray-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientModal;