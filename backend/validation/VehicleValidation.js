const { z } = require('zod');


const VehicleSchema = z.object({
    name: z.coerce.string(),
    number: z.coerce.string(),
    typeId: z.coerce.number().optional(),
    capacityTons: z.coerce.number().optional(),
    owned: z.coerce.boolean().default(false).optional(),
    isAvailable: z.coerce.boolean().default(true).optional(),
    provider: z.coerce.string().optional(),
    contact: z.coerce.string().optional(),
    currentStatus: z.coerce.string().optional(),
    createdAt: z.coerce.date().default(new Date())
});

const updateVehicleSchema = z.object({
    name: z.coerce.string().optional(),
    number: z.coerce.string().optional(),
    typeId: z.coerce.number().optional(),
    capacityTons: z.coerce.number().optional(),
    owned: z.coerce.boolean().default(false).optional(),
    isAvailable: z.coerce.boolean().default(true).optional(),
    provider: z.coerce.string().optional(),
    contact: z.coerce.string().optional(),
    currentStatus: z.coerce.string().optional(),
    createdAt: z.coerce.date().default(new Date()).optional()
});




module.exports = { VehicleSchema, updateVehicleSchema, };