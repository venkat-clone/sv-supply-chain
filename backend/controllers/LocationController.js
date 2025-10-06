const LocationService = require('../services/LocationService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getLocationById = async (req, res,next) => {
    console.log(`[LocationController] Getting Location by id: $${req.params.id}`);
    try {
        const Location = await LocationService.getLocationById(req.params.id);
        console.log(`[LocationController] Successfully retrieved Location: $${req.params.id}`);
        res.json(Location);
    } catch (error) {
    console.error(`[LocationController] Error getting Location by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createLocation = async (req, res,next) => {
    console.log(`[LocationController] Creating new =Location`, req.zBody);
    try {
        const newLocation = await LocationService.createLocation(req.zBody);
        console.log(`[LocationController] Successfully created =Location with id: ${newLocation.id}`);
        res.status(201).json(newLocation);
    } catch (error) {
    console.error(`[LocationController] Error creating =Location`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateLocation = async (req, res,next) => {
    console.log(`[LocationController] Updating =Location id: ${req.params.id}`, req.zBody);
    try {
        const updatedLocation = await LocationService.updateLocation(req.params.id, req.zBody);
        console.log(`[LocationController] Successfully updated =Location: ${req.params.id}`);
        res.json(updatedLocation);
    } catch (error) {
     console.error(`[LocationController] Error updating =Location: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteLocation = async (req, res,next) => {
    console.log(`[LocationController] Deleting =Location id: ${req.params.id}`);
    try {
        await LocationService.deleteLocation(req.params.id);
        console.log(`[LocationController] Successfully deleted =Location: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[LocationController] Error deleting =Location: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getLocations = async (req, res,next) => {
    console.log(`[LocationController] Getting =Location list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.name ? { name: generateStringFilter(filters.name) } : {},
filters.address ? { address: generateStringFilter(filters.address) } : {},
filters.pincode ? { pincode: generateStringFilter(filters.pincode) } : {},
filters.latitude ? { latitude: generateFloatFilter(filters.latitude) } : {},
filters.longitude ? { longitude: generateFloatFilter(filters.longitude) } : {},
filters.contact ? {} : {},
filters.contactId ? { contactId: generateIntegerFilter(filters.contactId) } : {},
filters.sentOrders ? {} : {},
filters.receivedOrders ? {} : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
{ address: { contains: search, mode: 'insensitive' } },
{ pincode: { contains: search, mode: 'insensitive' } },
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "name", "address", "pincode", "contactId"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { Locations, count } = await LocationService.getLocations(where, skip, pageSize, orderBy);
        console.log(`[LocationController] Successfully retrieved $${Locations.length} =Locationes`);
        res.status(200).json({
            data: Locations,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[LocationController] Error getting =Location list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
    
    getLocations
};