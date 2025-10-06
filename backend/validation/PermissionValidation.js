const { z } = require('zod');


const PermissionSchema = z.object({
    action: z.coerce.string(),
    description: z.coerce.string().optional(),
    createdAt: z.coerce.date().default(new Date())
});

const updatePermissionSchema = z.object({
    action: z.coerce.string().optional(),
    description: z.coerce.string().optional(),
    createdAt: z.coerce.date().default(new Date()).optional()
});




module.exports = { PermissionSchema, updatePermissionSchema, };