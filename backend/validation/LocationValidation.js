const { z } = require('zod');


const LocationSchema = z.object({
    name: z.coerce.string(),
    address: z.coerce.string(),
    pincode: z.coerce.string().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
    contactId: z.coerce.number()
});

const updateLocationSchema = z.object({
    name: z.coerce.string().optional(),
    address: z.coerce.string().optional(),
    pincode: z.coerce.string().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
    contactId: z.coerce.number().optional()
});




module.exports = { LocationSchema, updateLocationSchema, };