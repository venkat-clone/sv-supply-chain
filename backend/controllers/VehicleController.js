const VehicleService = require('../services/VehicleService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getVehicleById = async (req, res,next) => {
    console.log(`[VehicleController] Getting Vehicle by id: $${req.params.id}`);
    try {
        const Vehicle = await VehicleService.getVehicleById(req.params.id);
        console.log(`[VehicleController] Successfully retrieved Vehicle: $${req.params.id}`);
        res.json(Vehicle);
    } catch (error) {
    console.error(`[VehicleController] Error getting Vehicle by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createVehicle = async (req, res,next) => {
    console.log(`[VehicleController] Creating new =Vehicle`, req.zBody);
    try {
        const newVehicle = await VehicleService.createVehicle(req.zBody);
        console.log(`[VehicleController] Successfully created =Vehicle with id: ${newVehicle.id}`);
        res.status(201).json(newVehicle);
    } catch (error) {
    console.error(`[VehicleController] Error creating =Vehicle`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateVehicle = async (req, res,next) => {
    console.log(`[VehicleController] Updating =Vehicle id: ${req.params.id}`, req.zBody);
    try {
        const updatedVehicle = await VehicleService.updateVehicle(req.params.id, req.zBody);
        console.log(`[VehicleController] Successfully updated =Vehicle: ${req.params.id}`);
        res.json(updatedVehicle);
    } catch (error) {
     console.error(`[VehicleController] Error updating =Vehicle: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteVehicle = async (req, res,next) => {
    console.log(`[VehicleController] Deleting =Vehicle id: ${req.params.id}`);
    try {
        await VehicleService.deleteVehicle(req.params.id);
        console.log(`[VehicleController] Successfully deleted =Vehicle: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[VehicleController] Error deleting =Vehicle: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getVehicles = async (req, res,next) => {
    console.log(`[VehicleController] Getting =Vehicle list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.name ? { name: generateStringFilter(filters.name) } : {},
filters.number ? { number: generateStringFilter(filters.number) } : {},
filters.type ? {} : {},
filters.typeId ? { typeId: generateIntegerFilter(filters.typeId) } : {},
filters.capacityTons ? { capacityTons: generateFloatFilter(filters.capacityTons) } : {},
filters.owned ? { owned: generateBooleanFilter(filters.owned) } : {},
filters.isAvailable ? { isAvailable: generateBooleanFilter(filters.isAvailable) } : {},
filters.provider ? { provider: generateStringFilter(filters.provider) } : {},
filters.contact ? { contact: generateStringFilter(filters.contact) } : {},
filters.currentStatus ? { currentStatus: generateStringFilter(filters.currentStatus) } : {},
filters.createdAt ? { createdAt: generateDateFilter(filters.createdAt) } : {},
filters.orders ? {} : {},
filters.drivers ? {} : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
{ number: { contains: search, mode: 'insensitive' } },
{ provider: { contains: search, mode: 'insensitive' } },
{ contact: { contains: search, mode: 'insensitive' } },
{ currentStatus: { contains: search, mode: 'insensitive' } },
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "name", "number", "typeId", "provider", "contact", "currentStatus", "createdAt"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { Vehicles, count } = await VehicleService.getVehicles(where, skip, pageSize, orderBy);
        console.log(`[VehicleController] Successfully retrieved $${Vehicles.length} =Vehiclees`);
        res.status(200).json({
            data: Vehicles,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[VehicleController] Error getting =Vehicle list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    
    getVehicles
};