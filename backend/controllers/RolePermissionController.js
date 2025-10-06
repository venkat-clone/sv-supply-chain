const RolePermissionService = require('../services/RolePermissionService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getRolePermissionById = async (req, res,next) => {
    console.log(`[RolePermissionController] Getting RolePermission by id: $${req.params.id}`);
    try {
        const RolePermission = await RolePermissionService.getRolePermissionById(req.params.id);
        console.log(`[RolePermissionController] Successfully retrieved RolePermission: $${req.params.id}`);
        res.json(RolePermission);
    } catch (error) {
    console.error(`[RolePermissionController] Error getting RolePermission by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createRolePermission = async (req, res,next) => {
    console.log(`[RolePermissionController] Creating new =RolePermission`, req.zBody);
    try {
        const newRolePermission = await RolePermissionService.createRolePermission(req.zBody);
        console.log(`[RolePermissionController] Successfully created =RolePermission with id: ${newRolePermission.id}`);
        res.status(201).json(newRolePermission);
    } catch (error) {
    console.error(`[RolePermissionController] Error creating =RolePermission`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateRolePermission = async (req, res,next) => {
    console.log(`[RolePermissionController] Updating =RolePermission id: ${req.params.id}`, req.zBody);
    try {
        const updatedRolePermission = await RolePermissionService.updateRolePermission(req.params.id, req.zBody);
        console.log(`[RolePermissionController] Successfully updated =RolePermission: ${req.params.id}`);
        res.json(updatedRolePermission);
    } catch (error) {
     console.error(`[RolePermissionController] Error updating =RolePermission: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteRolePermission = async (req, res,next) => {
    console.log(`[RolePermissionController] Deleting =RolePermission id: ${req.params.id}`);
    try {
        await RolePermissionService.deleteRolePermission(req.params.id);
        console.log(`[RolePermissionController] Successfully deleted =RolePermission: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[RolePermissionController] Error deleting =RolePermission: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getRolePermissions = async (req, res,next) => {
    console.log(`[RolePermissionController] Getting =RolePermission list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.role ? {} : {},
filters.roleId ? { roleId: generateIntegerFilter(filters.roleId) } : {},
filters.permission ? {} : {},
filters.permissionId ? { permissionId: generateIntegerFilter(filters.permissionId) } : {},
                search ? {
                    OR: [
                        ,
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "roleId", "permissionId"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { RolePermissions, count } = await RolePermissionService.getRolePermissions(where, skip, pageSize, orderBy);
        console.log(`[RolePermissionController] Successfully retrieved $${RolePermissions.length} =RolePermissiones`);
        res.status(200).json({
            data: RolePermissions,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[RolePermissionController] Error getting =RolePermission list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission,
    
    getRolePermissions
};