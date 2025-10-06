const OrderRepository = require("../repositories/OrderRepository");
const { processFile } = require("../utils/import");
const { formatZodError } = require("../utils/utils");
const UserRepository = require("../repositories/UserRepository");
const VehicleRepository = require("../repositories/VehicleRepository");
const LocationRepository = require("../repositories/LocationRepository");
const ExtraChargeRepository = require("../repositories/ExtraChargeRepository");

const getOrderById = async (id) => {
  console.log(`[OrderService] Getting Order by id: ${id}`);
  return await OrderRepository.getOrderById(id);
};

const createOrder = async (data) => {
  console.log(`[OrderService] Creating new Order`, data);

  return await OrderRepository.createOrder(
    data,
    data.customer,
    data.driver,
    data.vehicle,
    data.fromLocation,
    data.toLocation,
    data.status,
    data.charges,
    data.transactionStatus
  );
};

const updateOrder = async (id, data) => {
  console.log(`[OrderService] Updating Order: ${id}`, data);
  return await OrderRepository.updateOrder(id, data);
};

const deleteOrder = async (id) => {
  console.log(`[OrderService] Deleting Order: ${id}`);
  return await OrderRepository.deleteOrder(id);
};

const getOrders = async (where, skip, take, orderBy) => {
  console.log(`[OrderService] Getting Order list`, {
    where,
    skip,
    take,
    orderBy,
  });
  return await OrderRepository.getOrderList(where, skip, take, orderBy);
};

const importOrder = async (filePath) => {
  const OrderImportMappings = {
    title: ["title"],
    amount: ["amount"],
    name: ["name"],
    address: ["address"],
    pincode: ["pincode"],
    latitude: ["latitude"],
    longitude: ["longitude"],
    name: ["name"],
    address: ["address"],
    pincode: ["pincode"],
    latitude: ["latitude"],
    longitude: ["longitude"],
    name: ["name"],
    number: ["number"],
    capacityTons: ["capacityTons"],
    provider: ["provider"],
    contact: ["contact"],
    currentStatus: ["currentStatus"],
    name: ["name"],
    phone: ["phone"],
    address: ["address"],
    name: ["name"],
    phone: ["phone"],
    address: ["address"],
    loadTons: ["loadTons"],
    status: ["status"],
    estimatedDistance: ["estimatedDistance"],
    traveledDistance: ["traveledDistance"],
    extraDistance: ["extraDistance"],
    deliveredAt: ["deliveredAt"],
    totalCharge: ["totalCharge"],
    transactionStatus: ["transactionStatus"],
  };
  console.log(
    `[OrderServiceService] Importing OrderService from file: ${filePath}`
  );

  const processedJson = await processFile(filePath, OrderImportMappings);

  let failedRows = [];
  let validRows = [];

  for (const row of processedJson) {
    const result = OrderImportSchema.safeParse(row);

    if (result.success) {
      validRows.push(result.data); // the parsed, typed object
    } else {
      const errors = formatZodError(result);
      failedRows.push({ ...row, errors });
    }
  }

  const rows = validRows.reduce((acc, item) => {
    let entry = {
      ...item,
      customer: [],
      driver: [],
      vehicle: [],
      fromLocation: [],
      toLocation: [],
      status: [],
      charges: [],
      transactionStatus: [],
    };
    entry.customer.push(item);
    entry.driver.push(item);
    entry.vehicle.push(item);
    entry.fromLocation.push(item);
    entry.toLocation.push(item);
    entry.status.push(item);
    entry.charges.push(item);
    entry.transactionStatus.push(item);
    acc.push(entry);
    return acc;
  }, []);

  let processedRows = 0;

  for (const row of rows) {
    const OrderData = {
      loadTons: row.loadTons,
      status: row.status,
      estimatedDistance: row.estimatedDistance,
      traveledDistance: row.traveledDistance,
      extraDistance: row.extraDistance,
      requestedAt: row.requestedAt,
      deliveredAt: row.deliveredAt,
      totalCharge: row.totalCharge,
      transactionStatus: row.transactionStatus,
    };
    const Order = await OrderRepository.upsertOrder(OrderData);
    row.order = { connect: { id: Order.id } };

    for (const User of row.customer) {
      const UserData = {
        name: row.name,
        phone: row.phone,
        address: row.address,
        createdAt: row.createdAt,
        role: row.roleRole.id,
      };
      const { Users: existingUsers, count } = await UserRepository.getUserList(
        UserData
      );
      if (count <= 0) {
        await UserRepository.createUser(UserData);
      } else {
        const existingUser = existingUsers[0];
        await UserRepository.updateUser(existingUser.id, UserData);
      }
      processedRows++;
    }
    for (const User of row.driver) {
      const UserData = {
        name: row.name,
        phone: row.phone,
        address: row.address,
        createdAt: row.createdAt,
        role: row.roleRole.id,
      };
      const { Users: existingUsers, count } = await UserRepository.getUserList(
        UserData
      );
      if (count <= 0) {
        await UserRepository.createUser(UserData);
      } else {
        const existingUser = existingUsers[0];
        await UserRepository.updateUser(existingUser.id, UserData);
      }
      processedRows++;
    }
    for (const Vehicle of row.vehicle) {
      const VehicleData = {
        name: row.name,
        number: row.number,
        capacityTons: row.capacityTons,
        owned: row.owned,
        isAvailable: row.isAvailable,
        provider: row.provider,
        contact: row.contact,
        currentStatus: row.currentStatus,
        createdAt: row.createdAt,
        type: row.typeVehicleType.id,
      };
      const { Vehicles: existingVehicles, count } =
        await VehicleRepository.getVehicleList(VehicleData);
      if (count <= 0) {
        await VehicleRepository.createVehicle(VehicleData);
      } else {
        const existingVehicle = existingVehicles[0];
        await VehicleRepository.updateVehicle(existingVehicle.id, VehicleData);
      }
      processedRows++;
    }
    for (const Location of row.fromLocation) {
      const LocationData = {
        name: row.name,
        address: row.address,
        pincode: row.pincode,
        latitude: row.latitude,
        longitude: row.longitude,
        contact: row.contactUser.id,
      };
      const { Locations: existingLocations, count } =
        await LocationRepository.getLocationList(LocationData);
      if (count <= 0) {
        await LocationRepository.createLocation(LocationData);
      } else {
        const existingLocation = existingLocations[0];
        await LocationRepository.updateLocation(
          existingLocation.id,
          LocationData
        );
      }
      processedRows++;
    }
    for (const Location of row.toLocation) {
      const LocationData = {
        name: row.name,
        address: row.address,
        pincode: row.pincode,
        latitude: row.latitude,
        longitude: row.longitude,
        contact: row.contactUser.id,
      };
      const { Locations: existingLocations, count } =
        await LocationRepository.getLocationList(LocationData);
      if (count <= 0) {
        await LocationRepository.createLocation(LocationData);
      } else {
        const existingLocation = existingLocations[0];
        await LocationRepository.updateLocation(
          existingLocation.id,
          LocationData
        );
      }
      processedRows++;
    }

    for (const ExtraCharge of row.charges) {
      const ExtraChargeData = {
        title: row.title,
        amount: row.amount,
        createdAt: row.createdAt,

        orderId: Order.id,
      };
      const { ExtraCharges: existingExtraCharges, count } =
        await ExtraChargeRepository.getExtraChargeList(ExtraChargeData);
      if (count <= 0) {
        await ExtraChargeRepository.createExtraCharge(ExtraChargeData);
      } else {
        const existingExtraCharge = existingExtraCharges[0];
        await ExtraChargeRepository.updateExtraCharge(
          existingExtraCharge.id,
          ExtraChargeData
        );
      }
      processedRows++;
    }
  }

  return {
    processedRows,
    failedRows,
  };
};

module.exports = {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,

  getOrders,
};
