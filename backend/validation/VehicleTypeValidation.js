const { z } = require('zod');


const VehicleTypeSchema = z.object({
    name: z.coerce.string(),
    minLoadCapacity: z.coerce.number(),
    maxLoadCapacity: z.coerce.number(),
    minDistance: z.coerce.number(),
    maxDistance: z.coerce.number(),
    description: z.coerce.string().optional()
});

const updateVehicleTypeSchema = z.object({
    name: z.coerce.string().optional(),
    minLoadCapacity: z.coerce.number().optional(),
    maxLoadCapacity: z.coerce.number().optional(),
    minDistance: z.coerce.number().optional(),
    maxDistance: z.coerce.number().optional(),
    description: z.coerce.string().optional()
});




module.exports = { VehicleTypeSchema, updateVehicleTypeSchema, };