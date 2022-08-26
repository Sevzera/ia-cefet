import fs from 'fs';
import csv from 'fast-csv';

export const readCSV = (filename) => {
    const data = [];
    fs.createReadStream(`../data/${filename}`)
        .pipe(csv.parse({ headers: false }))
        .on("error", (error) => console.error(error))
        .on("data", (row) => data.push(row))
        .on("end", () => {
            //console.log(data); 
            //console.log(data.length);  
            return data;
        });
};
