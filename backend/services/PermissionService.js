const PermissionRepository = require('../repositories/PermissionRepository');
const {processFile} = require("../utils/import");
const {formatZodError} = require("../utils/utils");


const getPermissionById = async (id) => {
    console.log(`[PermissionService] Getting Permission by id: ${id}`);
    return await PermissionRepository.getPermissionById(id);
};

const createPermission = async (data) => {
    console.log(`[PermissionService] Creating new Permission`, data);
    return await PermissionRepository.createPermission(data);

};

const updatePermission = async (id, data) => {
console.log(`[PermissionService] Updating Permission: ${id}`, data);
    return await PermissionRepository.updatePermission(id, data);
};

const deletePermission = async (id) => {
    console.log(`[PermissionService] Deleting Permission: ${id}`);
    return await PermissionRepository.deletePermission(id);
};

const getPermissions = async (where, skip, take, orderBy) => {
    console.log(`[PermissionService] Getting Permission list`, { where, skip, take, orderBy });
    return await PermissionRepository.getPermissionList(where, skip, take, orderBy);

};

            const importPermission = async (filePath) => {
                const PermissionImportMappings = {
                  action: ['action'],
  description: ['description']

                }
                console.log(`[PermissionServiceService] Importing PermissionService from file: ${filePath}`);

                const processedJson = await processFile(filePath, PermissionImportMappings);

                let failedRows = [];
               let validRows = [];


               for (const row of processedJson) {
                   const result = PermissionImportSchema.safeParse(row);

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
                 
                
                    const PermissionData ={
                          action : row.action ,
 description : row.description ,
 createdAt : row.createdAt ,
                           
                         };
          const Permission = await PermissionRepository.upsertPermission(PermissionData);
          row.permission = {connect: {id: Permission.id}};
                 
                
                

                }

                return {
         processedRows,
                    failedRows
    };
            };


module.exports = {
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission,
    
    getPermissions
};