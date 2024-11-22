import React, { useState, useEffect } from 'react';
import { Button } from './Components/ui/button';
import { Input } from './Components/ui/input';
import { Checkbox } from './Components/ui/checkbox';
import { Textarea } from './Components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./Components/ui/card";
import { Alert, AlertDescription } from "./Components/ui/alert";

export const CutsPage = () => {
  const [cuts, setCuts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingCut, setEditingCut] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    time: '',
    price: '',
    picture: '',
    specialty: false,
    popular: false
  });

  useEffect(() => {
    fetchCuts();
  }, []);

  const fetchCuts = async () => {
    try {
      const response = await fetch('/api/cuts');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setCuts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          picture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingCut 
        ? `/api/cuts/${editingCut._id}`
        : '/api/cuts';
      
      const method = editingCut ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      setSuccess(`Cut ${editingCut ? 'updated' : 'created'} successfully!`);
      fetchCuts();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cut?')) return;
    
    try {
      const response = await fetch(`/api/cuts/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      
      setSuccess('Cut deleted successfully!');
      fetchCuts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (cut) => {
    setEditingCut(cut);
    setFormData({
      name: cut.name,
      description: cut.description,
      time: cut.time,
      price: cut.price,
      picture: cut.picture,
      specialty: cut.specialty,
      popular: cut.popular
    });
  };

  const resetForm = () => {
    setEditingCut(null);
    setFormData({
      name: '',
      description: '',
      time: '',
      price: '',
      picture: '',
      specialty: false,
      popular: false
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Cuts</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-4">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingCut ? 'Edit Cut' : 'Add New Cut'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Cut Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                name="time"
                placeholder="Time (minutes)"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingCut}
              />
              {formData.picture && (
                <img 
                  src={formData.picture} 
                  alt="Preview" 
                  className="mt-2 max-w-xs h-auto"
                />
              )}
            </div>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <Checkbox
                  name="specialty"
                  checked={formData.specialty}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, specialty: checked }))
                  }
                />
                <span>Specialty Cut</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox
                  name="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, popular: checked }))
                  }
                />
                <span>Popular Cut</span>
              </label>
            </div>
            <div className="flex space-x-2">
              <Button type="submit">
                {editingCut ? 'Update Cut' : 'Add Cut'}
              </Button>
              {editingCut && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cuts.map(cut => (
          <Card key={cut._id}>
            <CardHeader>
              <CardTitle>{cut.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <img 
                  src={cut.picture} 
                  alt={cut.name} 
                  className="w-full h-48 object-cover rounded-md"
                />
                <p>{cut.description}</p>
                <p>Time: {cut.time} minutes</p>
                <p>Price: ${cut.price}</p>
                {cut.specialty && <p>Specialty Cut</p>}
                {cut.popular && <p>Popular Cut</p>}
                <div className="flex space-x-2">
                  <Button onClick={() => handleEdit(cut)}>Edit</Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(cut._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CutsPage;
