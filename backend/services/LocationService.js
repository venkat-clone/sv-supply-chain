const LocationRepository = require('../repositories/LocationRepository');
const {processFile} = require("../utils/import");
const {formatZodError} = require("../utils/utils");


const getLocationById = async (id) => {
    console.log(`[LocationService] Getting Location by id: ${id}`);
    return await LocationRepository.getLocationById(id);
};

const createLocation = async (data) => {
    console.log(`[LocationService] Creating new Location`, data);
    return await LocationRepository.createLocation(data);

};

const updateLocation = async (id, data) => {
console.log(`[LocationService] Updating Location: ${id}`, data);
    return await LocationRepository.updateLocation(id, data);
};

const deleteLocation = async (id) => {
    console.log(`[LocationService] Deleting Location: ${id}`);
    return await LocationRepository.deleteLocation(id);
};

const getLocations = async (where, skip, take, orderBy) => {
    console.log(`[LocationService] Getting Location list`, { where, skip, take, orderBy });
    return await LocationRepository.getLocationList(where, skip, take, orderBy);

};

            const importLocation = async (filePath) => {
                const LocationImportMappings = {
                  name: ['name'],
  address: ['address'],
  pincode: ['pincode'],
  latitude: ['latitude'],
  longitude: ['longitude']

                }
                console.log(`[LocationServiceService] Importing LocationService from file: ${filePath}`);

                const processedJson = await processFile(filePath, LocationImportMappings);

                let failedRows = [];
               let validRows = [];


               for (const row of processedJson) {
                   const result = LocationImportSchema.safeParse(row);

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
                 
                
                    const LocationData ={
                          name : row.name ,
 address : row.address ,
 pincode : row.pincode ,
 latitude : row.latitude ,
 longitude : row.longitude ,
                           
                         };
          const Location = await LocationRepository.upsertLocation(LocationData);
          row.location = {connect: {id: Location.id}};
                 
                
                

                }

                return {
         processedRows,
                    failedRows
    };
            };


module.exports = {
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
    
    getLocations
};