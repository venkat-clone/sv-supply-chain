const prisma = require('../config/config');

const getRoleList = async (where, skip, take, orderBy) => {
    console.log(`[RoleRepository] Getting Role list`, { where, skip, take, orderBy });
    const query = {
        where,
        skip,
        take,
        orderBy,
        include: {

        },
    };

    const [Roles, count] = await prisma.$transaction([
        prisma.role.findMany(query),
        prisma.role.count({ where: query.where })

    ]);
    console.log(`[RoleRepository] Retrieved ${Roles.length} Rolees, total count: ${count}`);
    return { Roles, count };
};

const createRole = async (data) => {
    console.log(`[RoleRepository] Creating Role`, data);
    return prisma.role.create({
        data: data
    });
};

const getRoleById = async (id) => {
    console.log(`[RoleRepository] Getting Role by id: ${id}`);

    return prisma.role.findUnique({
        where: { id: Number(id) },
        include: {
            
        }
    });
};

const updateRole = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.role.update({
        where: { id:  Number(id)  },
        data,
    });
};

 const deleteRole = async (id) => {
    console.log(`[RoleRepository] Deleting Role: ${id}`);
    return prisma.role.delete({ where: { id: Number(id) } });

};




const upsertRole = async (data) => {
    console.log(`[RoleRepository] Upserting Role`, data);
    return prisma.role.upsert({
        where: {
               name: data.name
         },
        update: data,
        create: data,
    });
};

module.exports = {
    createRole,
    updateRole,
    deleteRole,
    getRoleList,
    getRoleById,
    upsertRole,
    

};