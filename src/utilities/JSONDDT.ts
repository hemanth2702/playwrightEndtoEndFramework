import fs from "fs";

export function jsonFileRead():any{
   let data =  JSON.parse(fs.readFileSync("src/testDataApp.json","utf-8"));
    return data;
}