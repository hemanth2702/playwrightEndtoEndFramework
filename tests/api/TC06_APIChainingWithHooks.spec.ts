let Baseurl = process.env.API_URL!;

import {APIResponse, expect, test } from "@playwright/test"
import { readingAPIpayload } from "../../src/utilities/readingAPI.js";
import { request } from "node:http";


let bookingId:number;
let authToken:string;

test.beforeEach(async({request})=>{
    //step1:create new booking:post call
    //payload

    const payload = await readingAPIpayload("postdata");

    //post request
   const respone:APIResponse = await request.post(`${Baseurl}/booking`,{headers:{'Content-Type':'application/json'},data:payload});

   //to extract the json response payload
   const jsonResponse = await respone.json();
   console.log(jsonResponse);
   
//to extract only booking id
bookingId = jsonResponse.bookingid;
console.log("New booking created with bookingid:"+bookingId);

//step2: Get the booking details based on same bookingid
const getResponse = await request.get(`${Baseurl}/booking/${bookingId}`)

//to extract current response
const jsonGetRes = await getResponse.json();
console.log("Get the booking details using id: "+bookingId);
console.log(jsonGetRes);

//authpayload
const authPayload = await readingAPIpayload("authdata")
const authResponse = await request.post(`${Baseurl}/auth`,{headers:{'Content-Type':'application/json'},data:authPayload});


//print response
const res2 = await authResponse.json();
console.log(res2);

//extract token
authToken=res2.token;
console.log("Token generated: "+ authToken);



})

test("Create new booking-->get the same booking-->Generate token-->full update the booking",async({request})=>{

    //step1: Create new booking
    //step2:get the same booking

    //step3: Generate token

    //step4: Full update for the same booking

    const putPayload = await readingAPIpayload("putdata");
    const putResponse = await request.put(`${Baseurl}/booking/${bookingId}`,{headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Cookie':`token=${authToken}`
    },data:putPayload});

    //print the response

    let res3 = await putResponse.json();
    console.log("Updated booking is: ", res3);

    //assert status code
    expect(putResponse.status()).toBe(200);
    console.log("current booking is updated successfully!");
    
    
})

test("create new booking-->get the same booking-->Generate token-->partial update the booking",async({request})=>{

    //step1: create new booking

    //step2: get the same booking

    //step3: Generate token

    //step4: partial update for the same booking
    const patchPayload = await readingAPIpayload("patchdata")
    const patchResponse = await request.patch(`${Baseurl}/booking/${bookingId}`,{headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        'cookie':`token=${authToken}`
    },data:patchPayload});

    //print the response

    let res3 = await patchResponse.json();
    console.log("partial updated booking is: ", res3);

    //assertion status code
    expect(patchResponse.status()).toBe(200);
    console.log("current booking is partially updated successfully!");
    
    
})

test("create new booking-->get the same booking-->generate token-->delete thebooking",async({request})=>{
    //step1: create new booking

    //step2:get the same booking

    //step3: Generate token

    //step4:partial update for the same booking
    const deleteResponse = await request.delete(`${Baseurl}/booking/${bookingId}`,{headers:{
        'Content-Type':'application/json',
        'cookie':`token=${authToken}`
    }})

    //status code should be 201 and message should be created

    expect(deleteResponse.status()).toBe(201);
    console.log("status message is: "+deleteResponse.statusText());
    
    //step5: get the deleted booking and validate 404 status code

    const getRes = await request.get(`${Baseurl}/booking/${bookingId}`)

    //print it
    console.log("Get:Get the booking details...");

    let rawres = await getRes.text();
    console.log(rawres);

    expect(getRes.status()).toBe(404);
    console.log("Record is deleted! "+getRes.statusText());
    
    

})