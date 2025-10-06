const prisma = require('../config/config');

const getPermissionList = async (where, skip, take, orderBy) => {
    console.log(`[PermissionRepository] Getting Permission list`, { where, skip, take, orderBy });
    const query = {
        where,
        skip,
        take,
        orderBy,
        include: {

        },
    };

    const [Permissions, count] = await prisma.$transaction([
        prisma.permission.findMany(query),
        prisma.permission.count({ where: query.where })

    ]);
    console.log(`[PermissionRepository] Retrieved ${Permissions.length} Permissiones, total count: ${count}`);
    return { Permissions, count };
};

const createPermission = async (data) => {
    console.log(`[PermissionRepository] Creating Permission`, data);
    return prisma.permission.create({
        data: data
    });
};

const getPermissionById = async (id) => {
    console.log(`[PermissionRepository] Getting Permission by id: ${id}`);

    return prisma.permission.findUnique({
        where: { id: Number(id) },
        include: {
            
        }
    });
};

const updatePermission = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.permission.update({
        where: { id:  Number(id)  },
        data,
    });
};

 const deletePermission = async (id) => {
    console.log(`[PermissionRepository] Deleting Permission: ${id}`);
    return prisma.permission.delete({ where: { id: Number(id) } });

};




const upsertPermission = async (data) => {
    console.log(`[PermissionRepository] Upserting Permission`, data);
       if (!data.id) {
           return createPermission(data);
       }
    return prisma.permission.upsert({
        where: { id: data.id },
        update: data,
        create: data,
    });
};

module.exports = {
    createPermission,
    updatePermission,
    deletePermission,
    getPermissionList,
    getPermissionById,
    upsertPermission,
    

};