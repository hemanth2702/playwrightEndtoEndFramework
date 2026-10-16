import papa from "papaparse";

import fs from "fs";

export function readCsvFile(index:number):any
{

    //readFilesync will read given file synchronously
    const csvFile = fs.readFileSync("TestData/csvfile.csv", "utf-8");

    //header:true will treat first line as header and skipEmptyLines will not consider if the line is empty
    const result = papa.parse(csvFile,{
        header:true,
        skipEmptyLines:true
    })

    //passing the index because data will be reading through index.
 return result.data[index];

}