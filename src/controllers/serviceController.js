const Service = require('../models/serviceModel');

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({ provider: req.user.id });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const service = new Service({ ...req.body, provider: req.user.id });
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};