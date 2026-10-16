import fs, { readFileSync } from "fs";

export function readingAPIpayload(filename:string):Promise<any>
{
    return JSON.parse(fs.readFileSync("src/apiData/"+filename+".json",'utf-8')) //converts a javaScript object Notation (JSON) string into an object.
}

