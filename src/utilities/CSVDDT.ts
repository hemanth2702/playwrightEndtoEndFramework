import fs from "fs";
import papa from "papaparse";

export function readCsvFile():any
{

    const csvFile:string = fs.readFileSync("src/testData/App.csv","utf-8");

    const result = papa.parse(csvFile,{header:true,skipEmptyLines:true});

    return result.data;
}