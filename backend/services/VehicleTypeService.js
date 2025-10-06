const VehicleTypeRepository = require('../repositories/VehicleTypeRepository');
const {processFile} = require("../utils/import");
const {formatZodError} = require("../utils/utils");


const getVehicleTypeById = async (id) => {
    console.log(`[VehicleTypeService] Getting VehicleType by id: ${id}`);
    return await VehicleTypeRepository.getVehicleTypeById(id);
};

const createVehicleType = async (data) => {
    console.log(`[VehicleTypeService] Creating new VehicleType`, data);
    return await VehicleTypeRepository.createVehicleType(data);

};

const updateVehicleType = async (id, data) => {
console.log(`[VehicleTypeService] Updating VehicleType: ${id}`, data);
    return await VehicleTypeRepository.updateVehicleType(id, data);
};

const deleteVehicleType = async (id) => {
    console.log(`[VehicleTypeService] Deleting VehicleType: ${id}`);
    return await VehicleTypeRepository.deleteVehicleType(id);
};

const getVehicleTypes = async (where, skip, take, orderBy) => {
    console.log(`[VehicleTypeService] Getting VehicleType list`, { where, skip, take, orderBy });
    return await VehicleTypeRepository.getVehicleTypeList(where, skip, take, orderBy);

};

            const importVehicleType = async (filePath) => {
                const VehicleTypeImportMappings = {
                  name: ['name'],
  minLoadCapacity: ['minLoadCapacity'],
  maxLoadCapacity: ['maxLoadCapacity'],
  minDistance: ['minDistance'],
  maxDistance: ['maxDistance'],
  description: ['description']

                }
                console.log(`[VehicleTypeServiceService] Importing VehicleTypeService from file: ${filePath}`);

                const processedJson = await processFile(filePath, VehicleTypeImportMappings);

                let failedRows = [];
               let validRows = [];


               for (const row of processedJson) {
                   const result = VehicleTypeImportSchema.safeParse(row);

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
                 
                
                    const VehicleTypeData ={
                          name : row.name ,
 minLoadCapacity : row.minLoadCapacity ,
 maxLoadCapacity : row.maxLoadCapacity ,
 minDistance : row.minDistance ,
 maxDistance : row.maxDistance ,
 description : row.description ,
                           
                         };
          const VehicleType = await VehicleTypeRepository.upsertVehicleType(VehicleTypeData);
          row.vehicleType = {connect: {id: VehicleType.id}};
                 
                
                

                }

                return {
         processedRows,
                    failedRows
    };
            };


module.exports = {
    getVehicleTypeById,
    createVehicleType,
    updateVehicleType,
    deleteVehicleType,
    
    getVehicleTypes
};