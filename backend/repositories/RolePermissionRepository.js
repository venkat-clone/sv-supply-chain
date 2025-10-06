const prisma = require('../config/config');

const getRolePermissionList = async (where, skip, take, orderBy) => {
    console.log(`[RolePermissionRepository] Getting RolePermission list`, { where, skip, take, orderBy });
    const query = {
        where,
        skip,
        take,
        orderBy,
        include: {

        },
    };

    const [RolePermissions, count] = await prisma.$transaction([
        prisma.rolePermission.findMany(query),
        prisma.rolePermission.count({ where: query.where })

    ]);
    console.log(`[RolePermissionRepository] Retrieved ${RolePermissions.length} RolePermissiones, total count: ${count}`);
    return { RolePermissions, count };
};

const createRolePermission = async (data) => {
    console.log(`[RolePermissionRepository] Creating RolePermission`, data);
    return prisma.rolePermission.create({
        data: data
    });
};

const getRolePermissionById = async (id) => {
    console.log(`[RolePermissionRepository] Getting RolePermission by id: ${id}`);

    return prisma.rolePermission.findUnique({
        where: { id: Number(id) },
        include: {
            role:true,
permission:true
        }
    });
};

const updateRolePermission = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.rolePermission.update({
        where: { id:  Number(id)  },
        data,
    });
};

 const deleteRolePermission = async (id) => {
    console.log(`[RolePermissionRepository] Deleting RolePermission: ${id}`);
    return prisma.rolePermission.delete({ where: { id: Number(id) } });

};




const upsertRolePermission = async (data) => {
    console.log(`[RolePermissionRepository] Upserting RolePermission`, data);
       if (!data.id) {
           return createRolePermission(data);
       }
    return prisma.rolePermission.upsert({
        where: { id: data.id },
        update: data,
        create: data,
    });
};

module.exports = {
    createRolePermission,
    updateRolePermission,
    deleteRolePermission,
    getRolePermissionList,
    getRolePermissionById,
    upsertRolePermission,
    

};