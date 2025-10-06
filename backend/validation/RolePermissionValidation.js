const { z } = require('zod');


const RolePermissionSchema = z.object({
    roleId: z.coerce.number(),
    permissionId: z.coerce.number()
});

const updateRolePermissionSchema = z.object({
    roleId: z.coerce.number().optional(),
    permissionId: z.coerce.number().optional()
});




module.exports = { RolePermissionSchema, updateRolePermissionSchema, };