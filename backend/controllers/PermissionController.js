const PermissionService = require('../services/PermissionService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getPermissionById = async (req, res,next) => {
    console.log(`[PermissionController] Getting Permission by id: $${req.params.id}`);
    try {
        const Permission = await PermissionService.getPermissionById(req.params.id);
        console.log(`[PermissionController] Successfully retrieved Permission: $${req.params.id}`);
        res.json(Permission);
    } catch (error) {
    console.error(`[PermissionController] Error getting Permission by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createPermission = async (req, res,next) => {
    console.log(`[PermissionController] Creating new =Permission`, req.zBody);
    try {
        const newPermission = await PermissionService.createPermission(req.zBody);
        console.log(`[PermissionController] Successfully created =Permission with id: ${newPermission.id}`);
        res.status(201).json(newPermission);
    } catch (error) {
    console.error(`[PermissionController] Error creating =Permission`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updatePermission = async (req, res,next) => {
    console.log(`[PermissionController] Updating =Permission id: ${req.params.id}`, req.zBody);
    try {
        const updatedPermission = await PermissionService.updatePermission(req.params.id, req.zBody);
        console.log(`[PermissionController] Successfully updated =Permission: ${req.params.id}`);
        res.json(updatedPermission);
    } catch (error) {
     console.error(`[PermissionController] Error updating =Permission: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deletePermission = async (req, res,next) => {
    console.log(`[PermissionController] Deleting =Permission id: ${req.params.id}`);
    try {
        await PermissionService.deletePermission(req.params.id);
        console.log(`[PermissionController] Successfully deleted =Permission: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[PermissionController] Error deleting =Permission: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getPermissions = async (req, res,next) => {
    console.log(`[PermissionController] Getting =Permission list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.action ? { action: generateStringFilter(filters.action) } : {},
filters.description ? { description: generateStringFilter(filters.description) } : {},
filters.roles ? {} : {},
filters.createdAt ? { createdAt: generateDateFilter(filters.createdAt) } : {},
                search ? {
                    OR: [
                        { action: { contains: search, mode: 'insensitive' } },
{ description: { contains: search, mode: 'insensitive' } },
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "action", "description", "createdAt"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { Permissions, count } = await PermissionService.getPermissions(where, skip, pageSize, orderBy);
        console.log(`[PermissionController] Successfully retrieved $${Permissions.length} =Permissiones`);
        res.status(200).json({
            data: Permissions,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[PermissionController] Error getting =Permission list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission,
    
    getPermissions
};