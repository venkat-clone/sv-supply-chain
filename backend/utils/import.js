const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const XLSX = require('xlsx');

// Mapping function to extract relevant data
const extractData = (data, mapping) => {
    return data.map(item => {
        const mappedItem = {};

        // Loop through mapping
        for (const result in mapping) {
            const sources = mapping[result]; // sources is an array of source keys

            // If the source is an array, check each source key
            if (Array.isArray(sources)) {
                sources.forEach(source => {
                    if (item[source] !== undefined) {
                        mappedItem[result] = item[source];
                    }
                });
            } else {
                // Otherwise, directly use the source key
                if (item[sources] !== undefined) {
                    mappedItem[result] = item[sources];
                }
            }
        }

        return mappedItem;
    });
};

// Function to read and process CSV or Excel file
const processFile = (filePath, mapping, sheetName) => {

    const fileExtension = path.extname(filePath).toLowerCase();
    return new Promise((resolve, reject) => {
        if (fileExtension === '.csv') {
            // Process CSV file
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv.parse({headers: true, skipEmptyLines: true}))
                .on('data', row => results.push(row))
                .on('end', () => {
                    const mappedData = extractData(results, mapping);
                    resolve(mappedData); // Resolve the promise with mapped data
                })
                .on('error', (err) => reject(err)); // Reject on error
        } else if (fileExtension === '.xlsx') {
            // Process Excel file
            const workbook = XLSX.readFile(filePath);
            const sheet_name_list = workbook.SheetNames;
            const allMappedData = [];


            // sheet_name_list.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName|| sheet_name_list[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const mappedData = extractData(jsonData, mapping);
            allMappedData.push(mappedData);
            // });
            resolve(mappedData);
            resolve(allMappedData); // Resolve with all sheet data
        } else {
            reject(new Error('Unsupported file type!'));
        }
    });
};

module.exports = {
    processFile
};