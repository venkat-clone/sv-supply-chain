const VehicleTypeService = require('../services/VehicleTypeService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getVehicleTypeById = async (req, res,next) => {
    console.log(`[VehicleTypeController] Getting VehicleType by id: $${req.params.id}`);
    try {
        const VehicleType = await VehicleTypeService.getVehicleTypeById(req.params.id);
        console.log(`[VehicleTypeController] Successfully retrieved VehicleType: $${req.params.id}`);
        res.json(VehicleType);
    } catch (error) {
    console.error(`[VehicleTypeController] Error getting VehicleType by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createVehicleType = async (req, res,next) => {
    console.log(`[VehicleTypeController] Creating new =VehicleType`, req.zBody);
    try {
        const newVehicleType = await VehicleTypeService.createVehicleType(req.zBody);
        console.log(`[VehicleTypeController] Successfully created =VehicleType with id: ${newVehicleType.id}`);
        res.status(201).json(newVehicleType);
    } catch (error) {
    console.error(`[VehicleTypeController] Error creating =VehicleType`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateVehicleType = async (req, res,next) => {
    console.log(`[VehicleTypeController] Updating =VehicleType id: ${req.params.id}`, req.zBody);
    try {
        const updatedVehicleType = await VehicleTypeService.updateVehicleType(req.params.id, req.zBody);
        console.log(`[VehicleTypeController] Successfully updated =VehicleType: ${req.params.id}`);
        res.json(updatedVehicleType);
    } catch (error) {
     console.error(`[VehicleTypeController] Error updating =VehicleType: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteVehicleType = async (req, res,next) => {
    console.log(`[VehicleTypeController] Deleting =VehicleType id: ${req.params.id}`);
    try {
        await VehicleTypeService.deleteVehicleType(req.params.id);
        console.log(`[VehicleTypeController] Successfully deleted =VehicleType: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[VehicleTypeController] Error deleting =VehicleType: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getVehicleTypes = async (req, res,next) => {
    console.log(`[VehicleTypeController] Getting =VehicleType list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.name ? { name: generateStringFilter(filters.name) } : {},
filters.minLoadCapacity ? { minLoadCapacity: generateFloatFilter(filters.minLoadCapacity) } : {},
filters.maxLoadCapacity ? { maxLoadCapacity: generateFloatFilter(filters.maxLoadCapacity) } : {},
filters.minDistance ? { minDistance: generateFloatFilter(filters.minDistance) } : {},
filters.maxDistance ? { maxDistance: generateFloatFilter(filters.maxDistance) } : {},
filters.description ? { description: generateStringFilter(filters.description) } : {},
filters.vehicles ? {} : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
{ description: { contains: search, mode: 'insensitive' } },
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "name", "description"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { VehicleTypes, count } = await VehicleTypeService.getVehicleTypes(where, skip, pageSize, orderBy);
        console.log(`[VehicleTypeController] Successfully retrieved $${VehicleTypes.length} =VehicleTypees`);
        res.status(200).json({
            data: VehicleTypes,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[VehicleTypeController] Error getting =VehicleType list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getVehicleTypeById,
    createVehicleType,
    updateVehicleType,
    deleteVehicleType,
    
    getVehicleTypes
};