const UserService = require('../services/UserService');
const { generateIntegerFilter,
    generateBooleanFilter,
    generateDateFilter,
    generateStringFilter,
    generateEnumFilter } = require('../utils/filterUtils');
const {resolve} = require("node:path");

const getUserById = async (req, res,next) => {
    console.log(`[UserController] Getting User by id: $${req.params.id}`);
    try {
        const User = await UserService.getUserById(req.params.id);
        console.log(`[UserController] Successfully retrieved User: $${req.params.id}`);
        res.json(User);
    } catch (error) {
    console.error(`[UserController] Error getting User by id: $${req.params.id}`, error);
     console.error(error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const createUser = async (req, res,next) => {
    console.log(`[UserController] Creating new =User`, req.zBody);
    try {
        const newUser = await UserService.createUser(req.zBody);
        console.log(`[UserController] Successfully created =User with id: ${newUser.id}`);
        res.status(201).json(newUser);
    } catch (error) {
    console.error(`[UserController] Error creating =User`, error);

        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const updateUser = async (req, res,next) => {
    console.log(`[UserController] Updating =User id: ${req.params.id}`, req.zBody);
    try {
        const updatedUser = await UserService.updateUser(req.params.id, req.zBody);
        console.log(`[UserController] Successfully updated =User: ${req.params.id}`);
        res.json(updatedUser);
    } catch (error) {
     console.error(`[UserController] Error updating =User: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const deleteUser = async (req, res,next) => {
    console.log(`[UserController] Deleting =User id: ${req.params.id}`);
    try {
        await UserService.deleteUser(req.params.id);
        console.log(`[UserController] Successfully deleted =User: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
     console.error(`[UserController] Error deleting =User: ${req.params.id}`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }
};

const getUsers = async (req, res,next) => {
    console.log(`[UserController] Getting =User list with filters:`, req.query);
    try {
        const { search, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', ...filters } = req.query;
        const currentPage = Math.max(1, parseInt(page, 10));
        const pageSize = Math.max(1, parseInt(limit, 10));
        const skip = (currentPage - 1) * pageSize;

                const where = {
            AND: [
                filters.id ? { id: generateIntegerFilter(filters.id) } : {},
filters.name ? { name: generateStringFilter(filters.name) } : {},
filters.phone ? { phone: generateStringFilter(filters.phone) } : {},
filters.roleId ? { roleId: generateIntegerFilter(filters.roleId) } : {},
filters.role ? {} : {},
filters.orders ? {} : {},
filters.vehicle ? {} : {},
filters.rides ? {} : {},
filters.address ? { address: generateStringFilter(filters.address) } : {},
filters.Location ? {} : {},
filters.createdAt ? { createdAt: generateDateFilter(filters.createdAt) } : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
{ phone: { contains: search, mode: 'insensitive' } },
{ address: { contains: search, mode: 'insensitive' } },
                       // { uploadedBy: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                } : {}
            ].filter(Boolean),
        };

        const validFields = ["id", "name", "phone", "roleId", "address", "createdAt"];
        const orderBy = validFields.includes(sortBy) ? { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' } : { id: 'asc' };

        const { Users, count } = await UserService.getUsers(where, skip, pageSize, orderBy);
        console.log(`[UserController] Successfully retrieved $${Users.length} =Useres`);
        res.status(200).json({
            data: Users,
            meta: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize
            }
        });
    } catch (error) {
     console.error(`[UserController] Error getting =User list`, error);
        // res.status(400).json({ error: error.message });
        next(error);
    }

};




module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    
    getUsers
};