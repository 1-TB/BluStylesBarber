import { useState, useEffect } from 'react';
import { Button } from '../Components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../Components/ui/dialog';
import { Input } from '../Components/ui/input';

const Label = ({ children, htmlFor, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium text-gray-700 ${className}`}
  >
    {children}
  </label>
);

const DialogFooter = ({ children, className = '' }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}>
    {children}
  </div>
);

const EditBookingModal = ({
  isOpen,
  onClose,
  booking,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: {
      name: '',
      duration: 0,
      price: 0
    }
  });

  useEffect(() => {
    if (booking) {
      // Format the date from dd-mm-yyyy to yyyy-mm-dd for the date input
      const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('-');
        return `${year}-${month}-${day}`;
      };

      setFormData({
        name: booking.name || '',
        email: booking.email || '',
        phone: booking.phone || '',
        date: formatDate(booking.date) || '',
        time: booking.time || '',
        service: {
          name: booking.service?.name || '',
          duration: booking.service?.duration || 0,
          price: booking.service?.price || 0
        }
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    //ensure the value is a number and handle empty string
    if (name === 'duration' || name === 'price') {
      processedValue = value === '' ? 0 : Number(value);
    }

    setFormData(prev => ({
      ...prev,
      service: {
        ...prev.service,
        [name]: processedValue
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format the date back to dd-mm-yyyy before savie
    const formatDateForSubmit = (dateStr) => {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${day}-${month}-${year}`;
    };

    const submissionData = {
      ...formData,
      date: formatDateForSubmit(formData.date)
    };
    onSave(submissionData);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-indigo-900">
            Edit Booking
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Client Details Section */}
            <div>
              <h3 className="text-sm font-medium text-indigo-800 mb-3">Client Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Details Section */}
            <div>
              <h3 className="text-sm font-medium text-indigo-800 mb-3">Service Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service.name">Service Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="service.name"
                    name="name"
                    value={formData.service.name}
                    onChange={handleServiceChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service.duration">Duration (mins) <span className="text-red-500">*</span></Label>
                    <Input
                      id="service.duration"
                      name="duration"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.service.duration}
                      onChange={handleServiceChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service.price">Price ($) <span className="text-red-500">*</span></Label>
                    <Input
                      id="service.price"
                      name="price"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.service.price}
                      onChange={handleServiceChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Time Section */}
            <div>
              <h3 className="text-sm font-medium text-indigo-800 mb-3">Appointment Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time <span className="text-red-500">*</span></Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              className="hover:bg-gray-50 text-gray-900"
              variant="outline"
              onClick={onCancel || onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingModal;