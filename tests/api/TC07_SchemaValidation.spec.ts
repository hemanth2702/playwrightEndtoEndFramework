 import {expect, test} from "@playwright/test"
 import Ajv from "ajv"
import { readingAPIpayload } from "../../src/utilities/readingAPI.js";

 const ajv=new Ajv();

 const BaseUrl=process.env.API_URL!;

 test("test for restbooker schema validation",async({request})=>{

    //send request and get the response
    const payload = await readingAPIpayload("postdata");
    const response = await request.post(`${BaseUrl}/booking`,{headers:{'Content-Type':'application/json'},data:payload})

    //get then json response
    let jsonResponse = await response.json();
    //console.log(jsonResponse);
    
//store schema: https://transform.tools/json-to-json-schema
let schema={
  "type": "object",
  "properties": {
    "bookingid": {
      "type": "number"
    },
    "booking": {
      "type": "object",
      "properties": {
        "firstname": {
          "type": "string"
        },
        "lastname": {
          "type": "string"
        },
        "totalprice": {
          "type": "number"
        },
        "depositpaid": {
          "type": "boolean"
        },
        "bookingdates": {
          "type": "object",
          "properties": {
            "checkin": {
              "type": "string"
            },
            "checkout": {
              "type": "string"
            }
          },
          "required": [
            "checkin",
            "checkout"
          ]
        },
        "additionalneeds": {
          "type": "string"
        }
      },
      "required": [
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates",
        "additionalneeds"
      ]
    }
  },
  "required": [
    "bookingid",
    "booking"
  ]
}


//validation of response with schema

let validate = ajv.compile(schema);//this method return anonymous function whose name is validate.
let isValid = validate(jsonResponse);

if(!isValid)
{
    console.log("Schema Error: ", validate.errors);
    
}

expect(isValid).toBeTruthy();
console.log("response is valid as per schema");


})