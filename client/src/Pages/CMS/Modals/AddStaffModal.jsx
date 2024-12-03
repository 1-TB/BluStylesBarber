import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "../Components/ui/dialog";
import { Alert, AlertDescription } from "../Components/ui/alert";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { useAuth } from "../AuthContext";
import imageCompression from 'browser-image-compression'; 

const AddStaffModal = ({ isOpen, onClose, initialData = null, onSuccessfulSubmit }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    image: null,
    name: "",
    role: "",
    isAdmin: false,
    isStaff: true
  });
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { user } = useAuth();

  // Update form when initialData changes
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (initialData) {
      setFormData({
        ...initialData,
        password: "" // Always reset password field
      });
      setSelectedPhoto(initialData.image || null);
    } else {
      // Reset form when modal is opened without initial data
      resetForm();
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [initialData, isOpen]);

  //Conver image into a base64
  const base64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  //Compress image just incase if user sumbits a large photo
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,             // Maximum size in MB
      maxWidthOrHeight: 320,    // Match your required width
      useWebWorker: true,
      initialQuality: 0.8,
      width: 320,              // Force exact width
      height: 300              // Force exact height
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
      const base64String = await base64(compressedFile);
      return base64String;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  
  //If user changes image
  const handlePhotoChange = async (e) => {
    try {
      const file = e.target.files[0];

      // Compress the image before converting to base64
      const compressedBase64  = await compressImage(file);
      setSelectedPhoto(compressedBase64);
      setFormData((prev) => ({
        ...prev,
        image: compressedBase64
      }));
    } catch (error) {
      setError('Error processing image. Please try again.')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.role || 
        (!initialData && (!formData.password || !formData.image))) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const url = initialData != null 
        ? `/api/staff/${initialData._id}` 
        : "/api/staff";
      const method = initialData != null ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);
      onSuccessfulSubmit()
      handleClose();
    } catch (err) {
      console.error('Error uploading staff:', err);
      setError(initialData 
        ? "Failed to update staff member" 
        : "Failed to create staff member"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      image: null,
      name: "",
      role: "",
      isAdmin: false,
      isStaff: true
    });
    setSelectedPhoto(null);
    setError("");
  };

  const handleClose = () => {
    initialData = null;
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent ref={modalRef}>
        <DialogTitle className="mb-4">
          {initialData ? "Edit Staff Member" : "Add New Staff Member"}
        </DialogTitle>

        {error && (
          <Alert variant="destructive" className="text-sm mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 [&>div]:space-y-3">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                className="text-gray-900 h-9 md:h-10"
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                className="text-gray-900 h-9 md:h-10"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                className="text-gray-900 h-9 md:h-10"
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* Role Input */}
            <div>
              <label htmlFor="role" className="font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                className="text-gray-900 h-9 md:h-10"
                onChange={handleChange}
              />
            </div>

            {/* Image Input */}
            <div>
              <label htmlFor="image" className="font-medium text-gray-700">
                {initialData ? "Update Image" : "Add Image"} {!initialData && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="image"
                name="image"
                type="file"
                className="text-gray-900 h-9 md:h-10"
                onChange={handlePhotoChange}
              />
              
              {/* Show current image if in edit mode */}
              {initialData && selectedPhoto && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                  <img 
                    src={selectedPhoto} 
                    alt="Current Staff" 
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button className="w-24" type="submit">
                {initialData ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffModal;