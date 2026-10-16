import {test, expect, APIResponse} from "@playwright/test"
import fs from "fs";
import { readingAPIpayload } from "../../src/utilities/readingAPI.js";


let baseURL=process.env.API_URL!;

test("POST Request: create new resource from filedata", async({request})=>{

    let payload = JSON.parse(fs.readFileSync("src/apiData/postdata.json",'utf-8')) //converts a javascript object notation (JSON) string into an object.
    let response:APIResponse = await request.post(`${baseURL}/booking`,{headers:{
        "Content-Type": "application/json"
},data:payload}) //jsonobject --->JSON

expect(response.status()).toBe(200);
console.log("status code is: ", response.status());

//jsonresponse
let jsonResponse = await response.json();
console.log(jsonResponse);

//print booking id
console.log("Booking id created for request: ", jsonResponse.bookingid);


})

test("POST Request: Create new resource from Filedata utility", async({request})=>{

    //File is JSON--->Js object
    let payload = await readingAPIpayload("postdata");

    let response:APIResponse = await request.post(`${baseURL}/booking`,{headers:{
        "Content-Type" : "application/json"
    },data:payload}) //Jsobject--->JSON

    expect(response.status()).toBe(200);
    console.log("status code is: ", response.status());

    //jsonresponse
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    
    //print booking id
    console.log("Booking id created for request: ", jsonResponse.bookingid);
    
    
})