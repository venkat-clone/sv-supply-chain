const ExtraChargeService = require('../services/ExtraChargeService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getExtraChargeById = async (req, res,next) => {
    console.log(`[ExtraChargeController] Getting ExtraCharge by id: $${req.params.id}`);
    try {
        const ExtraCharge = await ExtraChargeService.getExtraChargeById(req.params.id);
        console.log(`[ExtraChargeController] Successfully retrieved ExtraCharge: $${req.params.id}`);
        res.json(ExtraCharge);
    } catch (error) {
    console.error(`[ExtraChargeController] Error getting ExtraCharge by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createExtraCharge = async (req, res,next) => {
    console.log(`[ExtraChargeController] Creating new =ExtraCharge`, req.zBody);
    try {
        const newExtraCharge = await ExtraChargeService.createExtraCharge(req.zBody);
        console.log(`[ExtraChargeController] Successfully created =ExtraCharge with id: ${newExtraCharge.id}`);
        res.status(201).json(newExtraCharge);
    } catch (error) {
    console.error(`[ExtraChargeController] Error creating =ExtraCharge`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateExtraCharge = async (req, res,next) => {
    console.log(`[ExtraChargeController] Updating =ExtraCharge id: ${req.params.id}`, req.zBody);
    try {
        const updatedExtraCharge = await ExtraChargeService.updateExtraCharge(req.params.id, req.zBody);
        console.log(`[ExtraChargeController] Successfully updated =ExtraCharge: ${req.params.id}`);
        res.json(updatedExtraCharge);
    } catch (error) {
     console.error(`[ExtraChargeController] Error updating =ExtraCharge: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteExtraCharge = async (req, res,next) => {
    console.log(`[ExtraChargeController] Deleting =ExtraCharge id: ${req.params.id}`);
    try {
        await ExtraChargeService.deleteExtraCharge(req.params.id);
        console.log(`[ExtraChargeController] Successfully deleted =ExtraCharge: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[ExtraChargeController] Error deleting =ExtraCharge: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getExtraCharges = async (req, res,next) => {
    console.log(`[ExtraChargeController] Getting =ExtraCharge list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.order ? {} : {},
filters.orderId ? { orderId: generateIntegerFilter(filters.orderId) } : {},
filters.title ? { title: generateStringFilter(filters.title) } : {},
filters.amount ? { amount: generateFloatFilter(filters.amount) } : {},
filters.createdAt ? { createdAt: generateDateFilter(filters.createdAt) } : {},
                search ? {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "orderId", "title", "createdAt"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { ExtraCharges, count } = await ExtraChargeService.getExtraCharges(where, skip, pageSize, orderBy);
        console.log(`[ExtraChargeController] Successfully retrieved $${ExtraCharges.length} =ExtraChargees`);
        res.status(200).json({
            data: ExtraCharges,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[ExtraChargeController] Error getting =ExtraCharge list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getExtraChargeById,
    createExtraCharge,
    updateExtraCharge,
    deleteExtraCharge,
    
    getExtraCharges
};