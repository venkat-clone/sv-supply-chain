const VehicleRepository = require('../repositories/VehicleRepository');
const {processFile} = require("../utils/import");
const {formatZodError} = require("../utils/utils");


const getVehicleById = async (id) => {
    console.log(`[VehicleService] Getting Vehicle by id: ${id}`);
    return await VehicleRepository.getVehicleById(id);
};

const createVehicle = async (data) => {
    console.log(`[VehicleService] Creating new Vehicle`, data);
    return await VehicleRepository.createVehicle(data);

};

const updateVehicle = async (id, data) => {
console.log(`[VehicleService] Updating Vehicle: ${id}`, data);
    return await VehicleRepository.updateVehicle(id, data);
};

const deleteVehicle = async (id) => {
    console.log(`[VehicleService] Deleting Vehicle: ${id}`);
    return await VehicleRepository.deleteVehicle(id);
};

const getVehicles = async (where, skip, take, orderBy) => {
    console.log(`[VehicleService] Getting Vehicle list`, { where, skip, take, orderBy });
    return await VehicleRepository.getVehicleList(where, skip, take, orderBy);

};

            const importVehicle = async (filePath) => {
                const VehicleImportMappings = {
                  name: ['name'],
  number: ['number'],
  capacityTons: ['capacityTons'],
  provider: ['provider'],
  contact: ['contact'],
  currentStatus: ['currentStatus']

                }
                console.log(`[VehicleServiceService] Importing VehicleService from file: ${filePath}`);

                const processedJson = await processFile(filePath, VehicleImportMappings);

                let failedRows = [];
               let validRows = [];


               for (const row of processedJson) {
                   const result = VehicleImportSchema.safeParse(row);

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
                 
                
                    const VehicleData ={
                          name : row.name ,
 number : row.number ,
 capacityTons : row.capacityTons ,
 owned : row.owned ,
 isAvailable : row.isAvailable ,
 provider : row.provider ,
 contact : row.contact ,
 currentStatus : row.currentStatus ,
 createdAt : row.createdAt ,
                           
                         };
          const Vehicle = await VehicleRepository.upsertVehicle(VehicleData);
          row.vehicle = {connect: {id: Vehicle.id}};
                 
                
                

                }

                return {
         processedRows,
                    failedRows
    };
            };


module.exports = {
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    
    getVehicles
};