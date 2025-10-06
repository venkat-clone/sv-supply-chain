const { z } = require('zod');


const RoleSchema = z.object({
    name: z.coerce.string(),
    description: z.coerce.string().optional(),
    createdAt: z.coerce.date().default(new Date())
});

const updateRoleSchema = z.object({
    name: z.coerce.string().optional(),
    description: z.coerce.string().optional(),
    createdAt: z.coerce.date().default(new Date()).optional()
});




module.exports = { RoleSchema, updateRoleSchema, };