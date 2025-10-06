const prisma = require('../config/config');

const getVehicleTypeList = async (where, skip, take, orderBy) => {
    console.log(`[VehicleTypeRepository] Getting VehicleType list`, { where, skip, take, orderBy });
    const query = {
        where,
        skip,
        take,
        orderBy,
        include: {

        },
    };

    const [VehicleTypes, count] = await prisma.$transaction([
        prisma.vehicleType.findMany(query),
        prisma.vehicleType.count({ where: query.where })

    ]);
    console.log(`[VehicleTypeRepository] Retrieved ${VehicleTypes.length} VehicleTypees, total count: ${count}`);
    return { VehicleTypes, count };
};

const createVehicleType = async (data) => {
    console.log(`[VehicleTypeRepository] Creating VehicleType`, data);
    return prisma.vehicleType.create({
        data: data
    });
};

const getVehicleTypeById = async (id) => {
    console.log(`[VehicleTypeRepository] Getting VehicleType by id: ${id}`);

    return prisma.vehicleType.findUnique({
        where: { id: Number(id) },
        include: {
            
        }
    });
};

const updateVehicleType = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.vehicleType.update({
        where: { id:  Number(id)  },
        data,
    });
};

 const deleteVehicleType = async (id) => {
    console.log(`[VehicleTypeRepository] Deleting VehicleType: ${id}`);
    return prisma.vehicleType.delete({ where: { id: Number(id) } });

};




const upsertVehicleType = async (data) => {
    console.log(`[VehicleTypeRepository] Upserting VehicleType`, data);
       if (!data.id) {
           return createVehicleType(data);
       }
    return prisma.vehicleType.upsert({
        where: { id: data.id },
        update: data,
        create: data,
    });
};

module.exports = {
    createVehicleType,
    updateVehicleType,
    deleteVehicleType,
    getVehicleTypeList,
    getVehicleTypeById,
    upsertVehicleType,
    

};