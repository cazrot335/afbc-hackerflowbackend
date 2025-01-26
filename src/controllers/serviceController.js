const Service = require('../models/serviceModel');
const User = require('../models/userModel');

// Get all services
const getServices = async (req, res) => {
    try {
        const services = await Service.find().populate('provider', 'name');
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new service
const createService = async (req, res) => {
    try {
        const { name, description, pricing, availability, specialOffers } = req.body;
        const newService = new Service({
            provider: req.user.id,
            name,
            description,
            pricing,
            availability,
            specialOffers
        });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a service
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, pricing, availability, specialOffers } = req.body;
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { name, description, pricing, availability, specialOffers },
            { new: true }
        );
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(updatedService);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a service
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getServices,
    createService,
    updateService,
    deleteService,
};