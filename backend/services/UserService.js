const UserRepository = require('../repositories/UserRepository');
const {processFile} = require("../utils/import");
const {formatZodError} = require("../utils/utils");
const VehicleRepository = require('../repositories/VehicleRepository');
const LocationRepository = require('../repositories/LocationRepository');
const RoleRepository = require('../repositories/RoleRepository');

const getUserById = async (id) => {
    console.log(`[UserService] Getting User by id: ${id}`);
    return await UserRepository.getUserById(id);
};

const createUser = async (data) => {
    console.log(`[UserService] Creating new User`, data);

    return await UserRepository.createUser(data,data.role,data.vehicle,data.Location);
};

const updateUser = async (id, data) => {
console.log(`[UserService] Updating User: ${id}`, data);
    return await UserRepository.updateUser(id, data);
};

const deleteUser = async (id) => {
    console.log(`[UserService] Deleting User: ${id}`);
    return await UserRepository.deleteUser(id);
};

const getUsers = async (where, skip, take, orderBy) => {
    console.log(`[UserService] Getting User list`, { where, skip, take, orderBy });
    return await UserRepository.getUserList(where, skip, take, orderBy);

};

            const importUser = async (filePath) => {
                const UserImportMappings = {
                  name: ['name'],
  description: ['description'],
  name: ['name'],
  address: ['address'],
  pincode: ['pincode'],
  latitude: ['latitude'],
  longitude: ['longitude'],
  name: ['name'],
  number: ['number'],
  capacityTons: ['capacityTons'],
  provider: ['provider'],
  contact: ['contact'],
  currentStatus: ['currentStatus'],
  name: ['name'],
  phone: ['phone'],
  address: ['address']

                }
                console.log(`[UserServiceService] Importing UserService from file: ${filePath}`);

                const processedJson = await processFile(filePath, UserImportMappings);

                let failedRows = [];
               let validRows = [];


               for (const row of processedJson) {
                   const result = UserImportSchema.safeParse(row);

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
                    role:[],
vehicle:[],
Location:[]
                };
                entry.role.push(item);
entry.vehicle.push(item);
entry.Location.push(item);
                acc.push(entry);
                return acc;
                }, []);

                let processedRows = 0;

                for (const row of rows) {
                 
                
                    const UserData ={
                          name : row.name ,
 phone : row.phone ,
 address : row.address ,
 createdAt : row.createdAt ,
                           
                         };
          const User = await UserRepository.upsertUser(UserData);
          row.user = {connect: {id: User.id}};
                 
                
                                   for (const Role of row.role){
                       const RoleData = {
                        name : row.name ,
description : row.description ,
createdAt : row.createdAt ,

                        

                       };
                       const {Roles: existingRoles,count} = await RoleRepository.getRoleList(RoleData);
                       if(count<=0){
                       await RoleRepository.createRole(RoleData);
                       }else{
                       const existingRole = existingRoles[0];
                        await RoleRepository.updateRole(existingRole.id,RoleData);

                       }
                       processedRows++;
                   }
                   for (const Vehicle of row.vehicle){
                       const VehicleData = {
                        name : row.name ,
number : row.number ,
capacityTons : row.capacityTons ,
owned : row.owned ,
isAvailable : row.isAvailable ,
provider : row.provider ,
contact : row.contact ,
currentStatus : row.currentStatus ,
createdAt : row.createdAt ,
type : row.typeVehicleType.id ,

                        

                       };
                       const {Vehicles: existingVehicles,count} = await VehicleRepository.getVehicleList(VehicleData);
                       if(count<=0){
                       await VehicleRepository.createVehicle(VehicleData);
                       }else{
                       const existingVehicle = existingVehicles[0];
                        await VehicleRepository.updateVehicle(existingVehicle.id,VehicleData);

                       }
                       processedRows++;
                   }
                   for (const Location of row.Location){
                       const LocationData = {
                        name : row.name ,
address : row.address ,
pincode : row.pincode ,
latitude : row.latitude ,
longitude : row.longitude ,

                        contactId:User.id

                       };
                       const {Locations: existingLocations,count} = await LocationRepository.getLocationList(LocationData);
                       if(count<=0){
                       await LocationRepository.createLocation(LocationData);
                       }else{
                       const existingLocation = existingLocations[0];
                        await LocationRepository.updateLocation(existingLocation.id,LocationData);

                       }
                       processedRows++;
                   }

                }

                return {
         processedRows,
                    failedRows
    };
            };


module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    
    getUsers
};