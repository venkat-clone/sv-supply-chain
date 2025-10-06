const { z } = require('zod');


const ExtraChargeSchema = z.object({
    orderId: z.coerce.number(),
    title: z.coerce.string(),
    amount: z.coerce.number(),
    createdAt: z.coerce.date().default(new Date())
});

const updateExtraChargeSchema = z.object({
    orderId: z.coerce.number().optional(),
    title: z.coerce.string().optional(),
    amount: z.coerce.number().optional(),
    createdAt: z.coerce.date().default(new Date()).optional()
});




module.exports = { ExtraChargeSchema, updateExtraChargeSchema, };