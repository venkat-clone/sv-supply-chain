const prisma = require('../config/config');

const getLocationList = async (where, skip, take, orderBy) => {
    console.log(`[LocationRepository] Getting Location list`, { where, skip, take, orderBy });
    const query = {
        where,
        skip,
        take,
        orderBy,
        include: {

        },
    };

    const [Locations, count] = await prisma.$transaction([
        prisma.location.findMany(query),
        prisma.location.count({ where: query.where })

    ]);
    console.log(`[LocationRepository] Retrieved ${Locations.length} Locationes, total count: ${count}`);
    return { Locations, count };
};

const createLocation = async (data) => {
    console.log(`[LocationRepository] Creating Location`, data);
    return prisma.location.create({
        data: data
    });
};

const getLocationById = async (id) => {
    console.log(`[LocationRepository] Getting Location by id: ${id}`);

    return prisma.location.findUnique({
        where: { id: Number(id) },
        include: {
            contact:true
        }
    });
};

const updateLocation = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.location.update({
        where: { id:  Number(id)  },
        data,
    });
};

 const deleteLocation = async (id) => {
    console.log(`[LocationRepository] Deleting Location: ${id}`);
    return prisma.location.delete({ where: { id: Number(id) } });

};




const upsertLocation = async (data) => {
    console.log(`[LocationRepository] Upserting Location`, data);
       if (!data.id) {
           return createLocation(data);
       }
    return prisma.location.upsert({
        where: { id: data.id },
        update: data,
        create: data,
    });
};

module.exports = {
    createLocation,
    updateLocation,
    deleteLocation,
    getLocationList,
    getLocationById,
    upsertLocation,
    

};