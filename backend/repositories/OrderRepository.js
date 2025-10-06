const prisma = require("../config/config");

const getOrderList = async (where, skip, take, orderBy) => {
  console.log(`[OrderRepository] Getting Order list`, {
    where,
    skip,
    take,
    orderBy,
  });
  const query = {
    where,
    skip,
    take,
    orderBy,
    include: {},
  };

  const [Orders, count] = await prisma.$transaction([
    prisma.order.findMany(query),
    prisma.order.count({ where: query.where }),
  ]);
  console.log(
    `[OrderRepository] Retrieved ${Orders.length} Orderes, total count: ${count}`
  );
  return { Orders, count };
};

const createOrder = async (
  data,
  customer,
  driver,
  vehicle,
  fromLocation,
  toLocation,
  status,
  charges,
  transactionStatus
) => {
  console.log(`[OrderRepository] Creating Order`, data);
  return prisma.order.create({
    data: {
      ...data,

      ...(customer?.length && {
        customer: { create: customer },
      }),

      ...(driver?.length && {
        driver: { create: driver },
      }),

      ...(vehicle?.length && {
        vehicle: { create: vehicle },
      }),

      ...(fromLocation?.length && {
        fromLocation: { create: fromLocation },
      }),

      ...(toLocation?.length && {
        toLocation: { create: toLocation },
      }),

      ...(status?.length && {
        status: status,
      }),

      ...(charges?.length && {
        charges: { create: charges },
      }),

      ...(transactionStatus?.length && {
        transactionStatus: { create: transactionStatus },
      }),
    },
  });
};

const getOrderById = async (id) => {
  console.log(`[OrderRepository] Getting Order by id: ${id}`);

  return prisma.order.findUnique({
    where: { id: Number(id) },
    include: {
      customer: true,
      driver: true,
      vehicle: true,
      fromLocation: true,
      toLocation: true,
    },
  });
};

const updateOrder = async (id, data) => {
  console.log(`[classNameRepository] Updating className: ${id}`, data);
  return prisma.order.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteOrder = async (id) => {
  console.log(`[OrderRepository] Deleting Order: ${id}`);
  return prisma.order.delete({ where: { id: Number(id) } });
};

const upsertOrder = async (data) => {
  console.log(`[OrderRepository] Upserting Order`, data);
  if (!data.id) {
    return createOrder(data);
  }
  return prisma.order.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderList,
  getOrderById,
  upsertOrder,
};
