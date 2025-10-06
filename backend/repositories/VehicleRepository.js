const prisma = require('../config/config');

const getVehicleList = async (where, skip, take, orderBy) => {
    console.log(`[VehicleRepository] Getting Vehicle list`, { where, skip, take, orderBy });
    const query = {
        where,
        skip,
        take,
        orderBy,
        include: {

        },
    };

    const [Vehicles, count] = await prisma.$transaction([
        prisma.vehicle.findMany(query),
        prisma.vehicle.count({ where: query.where })

    ]);
    console.log(`[VehicleRepository] Retrieved ${Vehicles.length} Vehiclees, total count: ${count}`);
    return { Vehicles, count };
};

const createVehicle = async (data) => {
    console.log(`[VehicleRepository] Creating Vehicle`, data);
    return prisma.vehicle.create({
        data: data
    });
};

const getVehicleById = async (id) => {
    console.log(`[VehicleRepository] Getting Vehicle by id: ${id}`);

    return prisma.vehicle.findUnique({
        where: { id: Number(id) },
        include: {
            type:true
        }
    });
};

const updateVehicle = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.vehicle.update({
        where: { id:  Number(id)  },
        data,
    });
};

 const deleteVehicle = async (id) => {
    console.log(`[VehicleRepository] Deleting Vehicle: ${id}`);
    return prisma.vehicle.delete({ where: { id: Number(id) } });

};




const upsertVehicle = async (data) => {
    console.log(`[VehicleRepository] Upserting Vehicle`, data);
    return prisma.vehicle.upsert({
        where: {
               number: data.number
         },
        update: data,
        create: data,
    });
};

module.exports = {
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleList,
    getVehicleById,
    upsertVehicle,
    

};