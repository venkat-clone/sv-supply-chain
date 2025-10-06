const RoleRepository = require('../repositories/RoleRepository');
const {processFile} = require("../utils/import");
const {formatZodError} = require("../utils/utils");


const getRoleById = async (id) => {
    console.log(`[RoleService] Getting Role by id: ${id}`);
    return await RoleRepository.getRoleById(id);
};

const createRole = async (data) => {
    console.log(`[RoleService] Creating new Role`, data);
    return await RoleRepository.createRole(data);

};

const updateRole = async (id, data) => {
console.log(`[RoleService] Updating Role: ${id}`, data);
    return await RoleRepository.updateRole(id, data);
};

const deleteRole = async (id) => {
    console.log(`[RoleService] Deleting Role: ${id}`);
    return await RoleRepository.deleteRole(id);
};

const getRoles = async (where, skip, take, orderBy) => {
    console.log(`[RoleService] Getting Role list`, { where, skip, take, orderBy });
    return await RoleRepository.getRoleList(where, skip, take, orderBy);

};

            const importRole = async (filePath) => {
                const RoleImportMappings = {
                  name: ['name'],
  description: ['description']

                }
                console.log(`[RoleServiceService] Importing RoleService from file: ${filePath}`);

                const processedJson = await processFile(filePath, RoleImportMappings);

                let failedRows = [];
               let validRows = [];


               for (const row of processedJson) {
                   const result = RoleImportSchema.safeParse(row);

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
                 
                
                    const RoleData ={
                          name : row.name ,
 description : row.description ,
 createdAt : row.createdAt ,
                           
                         };
          const Role = await RoleRepository.upsertRole(RoleData);
          row.role = {connect: {id: Role.id}};
                 
                
                

                }

                return {
         processedRows,
                    failedRows
    };
            };


module.exports = {
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    
    getRoles
};