const prisma = require('../config/config');

const getUserList = async (where, skip, take, orderBy) => {
    console.log(`[UserRepository] Getting User list`, { where, skip, take, orderBy });
    const query = {
      where,
      skip,
      take,
      orderBy,
      omit: {
        password: true,
      },
      include: {},
    };

    const [Users, count] = await prisma.$transaction([
        prisma.user.findMany(query),
        prisma.user.count({ where: query.where })

    ]);
    console.log(`[UserRepository] Retrieved ${Users.length} Useres, total count: ${count}`);
    return { Users, count };
};

const createUser = async (data, role,vehicle,Location) => {
    console.log(`[UserRepository] Creating User`, data);
    return prisma.user.create({
      omit: {
        password: true,
      },
      data: {
        ...data,

        ...(role?.length && {
          role: { create: role },
        }),

        ...(vehicle?.length && {
          vehicle: { create: vehicle },
        }),

        ...(Location?.length && {
          Location: { create: Location },
        }),
      },
    });
};


const getUserById = async (id) => {
    console.log(`[UserRepository] Getting User by id: ${id}`);

    return prisma.user.findUnique({
      where: { id: id },
        select:{
            id: true,
            name: true,
            phone: true,
            role: true,
            createdAt:true
        }
    });
};

const updateUser = async (id, data) => {
    console.log(`[classNameRepository] Updating className: ${id}`, data);
    return prisma.user.update({
      omit: {
        password: true,
      },
      where: { id: Number(id) },
      data,
    });
};

 const deleteUser = async (id) => {
    console.log(`[UserRepository] Deleting User: ${id}`);
    return prisma.user.delete({ where: { id: Number(id) } });

};

const getUserByPhone = async (phone,options) => {
    const {includePassword} = options || {};
    console.log(`[UserRepository] Getting User by phone: ${phone}`);
    return prisma.user.findFirst({
        omit: {
            password: !includePassword,
        },
        where: {phone},
    });
}


const upsertUser = async (data) => {
    console.log(`[UserRepository] Upserting User`, data);
       if (!data.id) {
           return createUser(data);
       }
    return prisma.user.upsert({
        where: { id: data.id },
        update: data,
        create: data,
    });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserList,
  getUserById,
  upsertUser,
  getUserByPhone,
};