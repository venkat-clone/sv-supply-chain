const OrderService = require('../services/OrderService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getOrderById = async (req, res,next) => {
    console.log(`[OrderController] Getting Order by id: $${req.params.id}`);
    try {
        const Order = await OrderService.getOrderById(req.params.id);
        console.log(`[OrderController] Successfully retrieved Order: $${req.params.id}`);
        res.json(Order);
    } catch (error) {
    console.error(`[OrderController] Error getting Order by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createOrder = async (req, res,next) => {
    console.log(`[OrderController] Creating new =Order`, req.zBody);
    try {
        const newOrder = await OrderService.createOrder(req.zBody);
        console.log(`[OrderController] Successfully created =Order with id: ${newOrder.id}`);
        res.status(201).json(newOrder);
    } catch (error) {
    console.error(`[OrderController] Error creating =Order`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateOrder = async (req, res,next) => {
    console.log(`[OrderController] Updating =Order id: ${req.params.id}`, req.zBody);
    try {
        const updatedOrder = await OrderService.updateOrder(req.params.id, req.zBody);
        console.log(`[OrderController] Successfully updated =Order: ${req.params.id}`);
        res.json(updatedOrder);
    } catch (error) {
     console.error(`[OrderController] Error updating =Order: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteOrder = async (req, res,next) => {
    console.log(`[OrderController] Deleting =Order id: ${req.params.id}`);
    try {
        await OrderService.deleteOrder(req.params.id);
        console.log(`[OrderController] Successfully deleted =Order: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[OrderController] Error deleting =Order: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getOrders = async (req, res,next) => {
    console.log(`[OrderController] Getting =Order list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.customer ? {} : {},
filters.customerId ? { customerId: generateIntegerFilter(filters.customerId) } : {},
filters.driver ? {} : {},
filters.driverId ? { driverId: generateIntegerFilter(filters.driverId) } : {},
filters.vehicle ? {} : {},
filters.vehicleId ? { vehicleId: generateIntegerFilter(filters.vehicleId) } : {},
filters.fromLocation ? {} : {},
filters.fromLocationId ? { fromLocationId: generateIntegerFilter(filters.fromLocationId) } : {},
filters.toLocation ? {} : {},
filters.toLocationId ? { toLocationId: generateIntegerFilter(filters.toLocationId) } : {},
filters.loadTons ? { loadTons: generateFloatFilter(filters.loadTons) } : {},
filters.status ? { status: generateEnumFilter(filters.status) } : {},
filters.estimatedDistance ? { estimatedDistance: generateFloatFilter(filters.estimatedDistance) } : {},
filters.traveledDistance ? { traveledDistance: generateFloatFilter(filters.traveledDistance) } : {},
filters.extraDistance ? { extraDistance: generateFloatFilter(filters.extraDistance) } : {},
filters.requestedAt ? { requestedAt: generateDateFilter(filters.requestedAt) } : {},
filters.deliveredAt ? { deliveredAt: generateDateFilter(filters.deliveredAt) } : {},
filters.charges ? {} : {},
filters.totalCharge ? { totalCharge: generateFloatFilter(filters.totalCharge) } : {},
filters.transactionStatus ? { transactionStatus: generateEnumFilter(filters.transactionStatus) } : {},
                search ? {
                    OR: [
                        ,
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "customerId", "driverId", "vehicleId", "fromLocationId", "toLocationId", "requestedAt", "deliveredAt"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { Orders, count } = await OrderService.getOrders(where, skip, pageSize, orderBy);
        console.log(`[OrderController] Successfully retrieved $${Orders.length} =Orderes`);
        res.status(200).json({
            data: Orders,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[OrderController] Error getting =Order list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    
    getOrders
};