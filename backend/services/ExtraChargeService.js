const ExtraChargeRepository = require('../repositories/ExtraChargeRepository');
const {processFile} = require("../utils/import");
const {formatZodError} = require("../utils/utils");


const getExtraChargeById = async (id) => {
    console.log(`[ExtraChargeService] Getting ExtraCharge by id: ${id}`);
    return await ExtraChargeRepository.getExtraChargeById(id);
};

const createExtraCharge = async (data) => {
    console.log(`[ExtraChargeService] Creating new ExtraCharge`, data);
    return await ExtraChargeRepository.createExtraCharge(data);

};

const updateExtraCharge = async (id, data) => {
console.log(`[ExtraChargeService] Updating ExtraCharge: ${id}`, data);
    return await ExtraChargeRepository.updateExtraCharge(id, data);
};

const deleteExtraCharge = async (id) => {
    console.log(`[ExtraChargeService] Deleting ExtraCharge: ${id}`);
    return await ExtraChargeRepository.deleteExtraCharge(id);
};

const getExtraCharges = async (where, skip, take, orderBy) => {
    console.log(`[ExtraChargeService] Getting ExtraCharge list`, { where, skip, take, orderBy });
    return await ExtraChargeRepository.getExtraChargeList(where, skip, take, orderBy);

};

            const importExtraCharge = async (filePath) => {
                const ExtraChargeImportMappings = {
                  title: ['title'],
  amount: ['amount']

                }
                console.log(`[ExtraChargeServiceService] Importing ExtraChargeService from file: ${filePath}`);

                const processedJson = await processFile(filePath, ExtraChargeImportMappings);

                let failedRows = [];
               let validRows = [];


               for (const row of processedJson) {
                   const result = ExtraChargeImportSchema.safeParse(row);

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
                 
                
                    const ExtraChargeData ={
                          title : row.title ,
 amount : row.amount ,
 createdAt : row.createdAt ,
                           
                         };
          const ExtraCharge = await ExtraChargeRepository.upsertExtraCharge(ExtraChargeData);
          row.extraCharge = {connect: {id: ExtraCharge.id}};
                 
                
                

                }

                return {
         processedRows,
                    failedRows
    };
            };


module.exports = {
    getExtraChargeById,
    createExtraCharge,
    updateExtraCharge,
    deleteExtraCharge,
    
    getExtraCharges
};