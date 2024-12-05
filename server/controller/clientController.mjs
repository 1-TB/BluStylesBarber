import Client from "../models/clientSchema.mjs";
import validateEmail from "../utils/validateEmail.mjs";
import validatePhone from "../utils/validatePhone.mjs";


// Create a new client
export const postClient = async (req, res) => {
  try {
    const { name, phone, email, lastVisit, nextVisit } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone format' });
    }

    const newClient = new Client({
      name,
      phone,
      email,
      lastVisit: lastVisit ? new Date(lastVisit) : null,
      nextVisit: nextVisit ? new Date(nextVisit) : null
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Failed to create client' });
  }
};

export const getClient = async (req, res) => {
  try {
    const { search, visitType, dateFrom, dateTo } = req.query;
    let query = {};

    // Search query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Date filters
    if (visitType && dateFrom) {
      const dateField = visitType === 'last' ? 'lastVisit' : 'nextVisit';

      const startDate = new Date(dateFrom);
      startDate.setHours(0, 0, 0, 0);

      const endDate = dateTo ? new Date(dateTo) : new Date(dateFrom);
      endDate.setHours(0, 0, 0, 0);

      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 2);
      
      query[dateField] = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const clients = await Client.find(query);
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Failed to fetch clients' });
  }
};


export const putClient = async (req, res) => {
  try {
    const { name, phone, email, lastVisit, nextVisit } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone format' });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone,
        email,
        lastVisit: lastVisit ? new Date(lastVisit) : null,
        nextVisit: nextVisit ? new Date(nextVisit) : null
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Failed to update client' });
  }
};

export const deletedClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Failed to delete client' });
  }
};