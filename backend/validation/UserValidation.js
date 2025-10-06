const { z } = require('zod');
const {RoleSchema} = require("./RoleValidation");

const {VehicleSchema} = require("./VehicleValidation");

const {LocationSchema} = require("./LocationValidation");

const LocationWithUserSchema = LocationSchema.extend({
    contactId: LocationSchema.shape.contactId.optional(),
});


const UserSchema = z.object({
    name: z.coerce.string(),
    phone: z.coerce.string(),
    roleId: z.coerce.number(),
    address: z.coerce.string().optional(),
    Location: z.array(LocationWithUserSchema).optional(),
    createdAt: z.coerce.date().default(new Date())
});

const updateUserSchema = z.object({
    name: z.coerce.string().optional(),
    phone: z.coerce.string().optional(),
    roleId: z.coerce.number().optional(),
    address: z.coerce.string().optional(),
    Location: z.array(LocationWithUserSchema).optional(),
    createdAt: z.coerce.date().default(new Date()).optional()
});




module.exports = { UserSchema, updateUserSchema, };