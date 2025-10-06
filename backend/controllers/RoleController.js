const RoleService = require('../services/RoleService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getRoleById = async (req, res,next) => {
    console.log(`[RoleController] Getting Role by id: $${req.params.id}`);
    try {
        const Role = await RoleService.getRoleById(req.params.id);
        console.log(`[RoleController] Successfully retrieved Role: $${req.params.id}`);
        res.json(Role);
    } catch (error) {
    console.error(`[RoleController] Error getting Role by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createRole = async (req, res,next) => {
    console.log(`[RoleController] Creating new =Role`, req.zBody);
    try {
        const newRole = await RoleService.createRole(req.zBody);
        console.log(`[RoleController] Successfully created =Role with id: ${newRole.id}`);
        res.status(201).json(newRole);
    } catch (error) {
    console.error(`[RoleController] Error creating =Role`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateRole = async (req, res,next) => {
    console.log(`[RoleController] Updating =Role id: ${req.params.id}`, req.zBody);
    try {
        const updatedRole = await RoleService.updateRole(req.params.id, req.zBody);
        console.log(`[RoleController] Successfully updated =Role: ${req.params.id}`);
        res.json(updatedRole);
    } catch (error) {
     console.error(`[RoleController] Error updating =Role: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteRole = async (req, res,next) => {
    console.log(`[RoleController] Deleting =Role id: ${req.params.id}`);
    try {
        await RoleService.deleteRole(req.params.id);
        console.log(`[RoleController] Successfully deleted =Role: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[RoleController] Error deleting =Role: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getRoles = async (req, res,next) => {
    console.log(`[RoleController] Getting =Role list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.name ? { name: generateStringFilter(filters.name) } : {},
filters.description ? { description: generateStringFilter(filters.description) } : {},
filters.users ? {} : {},
filters.permissions ? {} : {},
filters.createdAt ? { createdAt: generateDateFilter(filters.createdAt) } : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
{ description: { contains: search, mode: 'insensitive' } },
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "name", "description", "createdAt"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { Roles, count } = await RoleService.getRoles(where, skip, pageSize, orderBy);
        console.log(`[RoleController] Successfully retrieved $${Roles.length} =Rolees`);
        res.status(200).json({
            data: Roles,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[RoleController] Error getting =Role list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    
    getRoles
};