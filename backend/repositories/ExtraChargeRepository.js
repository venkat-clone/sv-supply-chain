const prisma = require('../config/config');

const getExtraChargeList = async (where, skip, take, orderBy) => {
    console.log(`[ExtraChargeRepository] Getting ExtraCharge list`, { where, skip, take, orderBy });
    const query = {
        where,
        skip,
        take,
        orderBy,
        include: {

        },
    };

    const [ExtraCharges, count] = await prisma.$transaction([
        prisma.extraCharge.findMany(query),
        prisma.extraCharge.count({ where: query.where })

    ]);
    console.log(`[ExtraChargeRepository] Retrieved ${ExtraCharges.length} ExtraChargees, total count: ${count}`);
    return { ExtraCharges, count };
};

const createExtraCharge = async (data) => {
    console.log(`[ExtraChargeRepository] Creating ExtraCharge`, data);
    return prisma.extraCharge.create({
        data: data
    });
};

const getExtraChargeById = async (id) => {
    console.log(`[ExtraChargeRepository] Getting ExtraCharge by id: ${id}`);

    return prisma.extraCharge.findUnique({
        where: { id: Number(id) },
        include: {
            order:true
        }
    });
};

const updateExtraCharge = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.extraCharge.update({
        where: { id:  Number(id)  },
        data,
    });
};

 const deleteExtraCharge = async (id) => {
    console.log(`[ExtraChargeRepository] Deleting ExtraCharge: ${id}`);
    return prisma.extraCharge.delete({ where: { id: Number(id) } });

};




const upsertExtraCharge = async (data) => {
    console.log(`[ExtraChargeRepository] Upserting ExtraCharge`, data);
       if (!data.id) {
           return createExtraCharge(data);
       }
    return prisma.extraCharge.upsert({
        where: { id: data.id },
        update: data,
        create: data,
    });
};

module.exports = {
    createExtraCharge,
    updateExtraCharge,
    deleteExtraCharge,
    getExtraChargeList,
    getExtraChargeById,
    upsertExtraCharge,
    

};