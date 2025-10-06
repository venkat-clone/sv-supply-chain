const RolePermissionRepository = require("../repositories/RolePermissionRepository");
const { processFile } = require("../utils/import");
const { formatZodError } = require("../utils/utils");

const getRolePermissionById = async (id) => {
  console.log(`[RolePermissionService] Getting RolePermission by id: ${id}`);
  return await RolePermissionRepository.getRolePermissionById(id);
};

const createRolePermission = async (data) => {
  console.log(`[RolePermissionService] Creating new RolePermission`, data);
  return await RolePermissionRepository.createRolePermission(data);
};

const updateRolePermission = async (id, data) => {
  console.log(`[RolePermissionService] Updating RolePermission: ${id}`, data);
  return await RolePermissionRepository.updateRolePermission(id, data);
};

const deleteRolePermission = async (id) => {
  console.log(`[RolePermissionService] Deleting RolePermission: ${id}`);
  return await RolePermissionRepository.deleteRolePermission(id);
};

const getRolePermissions = async (where, skip, take, orderBy) => {
  console.log(`[RolePermissionService] Getting RolePermission list`, {
    where,
    skip,
    take,
    orderBy,
  });
  return await RolePermissionRepository.getRolePermissionList(
    where,
    skip,
    take,
    orderBy
  );
};

const importRolePermission = async (filePath) => {
  const RolePermissionImportMappings = {};
  console.log(
    `[RolePermissionServiceService] Importing RolePermissionService from file: ${filePath}`
  );

  const processedJson = await processFile(
    filePath,
    RolePermissionImportMappings
  );

  let failedRows = [];
  let validRows = [];

  for (const row of processedJson) {
    const result = RolePermissionImportSchema.safeParse(row);

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
    };

    acc.push(entry);
    return acc;
  }, []);

  let processedRows = 0;

  for (const row of rows) {
    const RolePermissionData = {};
    const RolePermission = await RolePermissionRepository.upsertRolePermission(
      RolePermissionData
    );
    row.rolePermission = { connect: { id: RolePermission.id } };
  }

  return {
    processedRows,
    failedRows,
  };
};

module.exports = {
  getRolePermissionById,
  createRolePermission,
  updateRolePermission,
  deleteRolePermission,

  getRolePermissions,
};
