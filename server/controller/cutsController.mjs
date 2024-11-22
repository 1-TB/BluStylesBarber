import Cut from '../models/cutsSchemea.mjs';

// Get all cuts
export const getAllCuts = async (req, res) => {
  try {
    const cuts = await Cut.find();
    res.status(200).json(cuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single cut by ID
export const getCutById = async (req, res) => {
  try {
    const cut = await Cut.findById(req.params.id);
    if (!cut) {
      return res.status(404).json({ message: 'Cut not found' });
    }
    res.status(200).json(cut);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new cut
export const createCut = async (req, res) => {
  const cut = new Cut(req.body);
  try {
    const newCut = await cut.save();
    res.status(201).json(newCut);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update cut
export const updateCut = async (req, res) => {
  try {
    const cut = await Cut.findById(req.params.id);
    if (!cut) {
      return res.status(404).json({ message: 'Cut not found' });
    }
    
    Object.assign(cut, req.body);
    const updatedCut = await cut.save();
    res.status(200).json(updatedCut);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete cut
export const deleteCut = async (req, res) => {
  try {
    const cut = await Cut.findById(req.params.id);
    if (!cut) {
      return res.status(404).json({ message: 'Cut not found' });
    }
    
    await cut.deleteOne();
    res.status(200).json({ message: 'Cut deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
