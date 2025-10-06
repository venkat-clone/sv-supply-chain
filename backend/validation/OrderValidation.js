const { z } = require("zod");
const { UserSchema } = require("./UserValidation");

const { VehicleSchema } = require("./VehicleValidation");

const { LocationSchema } = require("./LocationValidation");

const { ExtraChargeSchema } = require("./ExtraChargeValidation");

const ExtraChargeWithOrderSchema = ExtraChargeSchema.extend({
  orderId: ExtraChargeSchema.shape.orderId.optional(),
});
const ChargesCreateSchema = z.object({
  create: z.array(ExtraChargeWithOrderSchema),
});


const nullToUndefined = (schema) =>
  z.preprocess((val) => (val === null ? undefined : val), schema);
const OrderSchema = z.object({
  customerId: z.coerce.number(),
  driverId: z.coerce.number().optional(),
  vehicleId: z.coerce.number().optional(),
  fromLocationId: z.coerce.number(),
  toLocationId: z.coerce.number(),
  loadTons: z.coerce.number(),
  status: nullToUndefined(
    z.enum(["REQUESTED", "ASSIGNED", "ENROUTE", "DELIVERED", "CANCELLED"])
  ),
  estimatedDistance: z.coerce.number().optional(),
  traveledDistance: z.coerce.number().optional(),
  extraDistance: z.coerce.number().optional(),
  requestedAt: z.coerce.date().default(new Date()),
  deliveredAt: z.coerce.date().optional(),
  charges: z.array(ExtraChargeWithOrderSchema).optional(),
  totalCharge: z.coerce.number().optional(),
  transactionStatus: nullToUndefined(
    z.enum(["PENDING", "COMPLETED", "FAILED"]).optional()
  ),
});

const updateOrderSchema = z.object({
  customerId: z.coerce.number().optional(),
  driverId: z.coerce.number().optional(),
  vehicleId: z.coerce.number().optional(),
  fromLocationId: z.coerce.number().optional(),
  toLocationId: z.coerce.number().optional(),
  loadTons: z.coerce.number().optional(),
  status: nullToUndefined(
    z
      .enum(["REQUESTED", "ASSIGNED", "ENROUTE", "DELIVERED", "CANCELLED"])
      .optional()
  ),
  estimatedDistance: z.coerce.number().optional(),
  traveledDistance: z.coerce.number().optional(),
  extraDistance: z.coerce.number().optional(),
  requestedAt: z.coerce.date().default(new Date()).optional(),
  deliveredAt: z.coerce.date().optional(),
  charges: ChargesCreateSchema.optional(),
  totalCharge: z.coerce.number().optional(),
  transactionStatus: nullToUndefined(
    z.enum(["PENDING", "COMPLETED", "FAILED"]).optional()
  ),
});

module.exports = { OrderSchema, updateOrderSchema };
