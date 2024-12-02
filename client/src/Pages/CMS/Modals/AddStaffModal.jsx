import React, { useState } from "react";
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

const AddStaffModal = ({ isOpen, onClose }) => {
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

  const base64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await base64(file);
    setSelectedPhoto(base64Image);
    setFormData((prev) => ({
      ...prev,
      image: base64Image
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation to match controller method
    if (!formData.name || !formData.password || !formData.email || !formData.image || !formData.role) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/staff", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);
      
      handleClose()
      onClose(); // Close modal on successful submission
    } catch (err) {
      console.error('Error uploading staff:', err);
      setError("Failed to create staff member");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      email: "",
      password: "",
      image: null,
      name: "",
      role: "",
      isAdmin: false,
      isStaff: true
    });
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle className="mb-4">Add New Staff Member</DialogTitle>

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

            {/*Image Input */}
            <div>
              <label htmlFor="image" className="font-medium text-gray-700">
                Add Image <span className="text-red-500">*</span>
              </label>
              <Input
                id="image"
                name="image"
                type="file"
                className="text-gray-900 h-9 md:h-10"
                onChange={handlePhotoChange}
              />
            </div>

            <div className="flex justify-center">
              <Button className="w-24" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffModal;