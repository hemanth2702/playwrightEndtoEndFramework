import fs from "fs";
//if fs got error fun the main file and here issue will get resolved


export function jsonFileRead(rowNumber:number):any{

    let data = JSON.parse(fs.readFileSync("src/testData/App.json","utf-8"))

    return data[rowNumber];
}