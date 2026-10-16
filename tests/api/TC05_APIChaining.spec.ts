/*
API Chaining
===============
When we send request and response comming from one api we reused as prerequisite to other api
that is api chaining.

1. create new resource(post)-->bookingid-->sending get call(booking detail)
2. create new resource(post)--> bookingid+ token from Auth API--->Full update resource(PUT)
3. create new resource(post)--> bookingid+ token from Auth API--->partial update resource(patch)
4. create new resource(post)--> bookingid+ token from Auth API--> delete resource

Note:
Test case should be independent, its executing parallelly right technique to api testing.

Recommended technique for playwright
*/

//url is added from the config file.
let BaseUrl=process.env.API_URL!;
import {test, expect, APIResponse} from "@playwright/test"
import { readingAPIpayload } from "../../src/utilities/readingAPI.js";
import { request } from "node:http";


test("create new Booking--->get the same bookingdetails", async({request})=>{

    //step1: create  new booking: POST call

    const payload = await readingAPIpayload("postdata");

    const response:APIResponse = await request.post(`${BaseUrl}/booking`,{
        headers:{
            'Content-Type': 'application/json'
        },data:payload});

        //assertion
        expect(response.status()).toBe(200);
        console.log("status code is: ", response.status()); //200

        //to extract the json response payload
        const jsonResponse = await response.json();
        console.log(jsonResponse);

        //to extract only booking id

        const bookingId = jsonResponse.bookingid;
        console.log("New booking created with bookingid: ", bookingId);

        //step2: Get the booking details based on same bookingid
        const getResponse = await request.get(`${BaseUrl}/booking/${bookingId}`)

        //to extract current response
        const jsonGetRes = await getResponse.json();
        console.log("Get the booking details using id: "+ bookingId);
        console.log(jsonGetRes);

        //asserrtion
        expect(getResponse.status()).toBe(200);        
        
})

test("create new booking-->get the same booking-->Generate token-->full update the booking", async({request})=>{

    //step1:create new booking

    const postPayload = await readingAPIpayload("postdata");
    const postResponse = await request.post(`${BaseUrl}/booking`,{headers:{"Content-Type":"application/json"},data:postPayload});

//print new booking details
const res1 = await postResponse.json();
console.log("New Booking created:", res1);

//extract booking id
const bookingId = res1.bookingid;
console.log("New booking created with id: ",bookingId);

//step2:get the same boooking using booking id
const getResponse = await request.get(`${BaseUrl}/booking/${bookingId}`)
//print it
console.log("Get: Get the booking details....");

console.log(await getResponse.json());

//step3: Generate token
//authpayload
const authPayload = await readingAPIpayload("authdata");
const authResponse = await request.post(`${BaseUrl}/auth`,{headers:{'Content-Type':'application/json'},data:authPayload});

//print response
const res2=await authResponse.json();
console.log(res2);

//extract token
const authToken = res2.token;
console.log("Token generated: ", authToken);

//step4: Full update for the same booking
const putPayload = await readingAPIpayload("putdata");
const putResponse = await request.put(`${BaseUrl}/booking/${bookingId}`,{headers:{
    'Content-Type':'application/json',
    'Accept':'application/json',
    'cookie':`token=${authToken}`
    }, data:putPayload})

const res3 = await putResponse.json();
console.log("updated booking is: ", res3);

//assert status code
expect(putResponse.status()).toBe(200);
console.log("current booking is updated successfully!");


})

test("Create new booking-->get the same booking-->generate token-->partial update the booking", async({request})=>{
     
    //step1: create new booking

    const postPayload = await readingAPIpayload("postdata");
    const postResponse = await request.post(`${BaseUrl}/booking`,{headers:{
        'Content-Type':'application/json',
    },data:postPayload});

    //print new booking details
    const res1 = await postResponse.json();
    console.log("New booking id created: ", res1);

    //extract booking id
    const bookingId = res1.bookingid;
    console.log("New booking id created with id: ", bookingId);
    

    //step2: get the same booking using bookingId
    const getResponse = await request.get(`${BaseUrl}/booking/${bookingId}`);
    //print it
    console.log("Get: get the booking details...");
    console.log(await getResponse.json());

    //step3: Generate token
    const authPayload = await readingAPIpayload("authdata");
    const authResponse =await request.post(`${BaseUrl}/auth`,{headers:{'Content-Type':'application/json'
    },data:authPayload})
    
    //print response
    const res2=await authResponse.json();
    console.log(res2);
    
    const authToken = res2.token;
    console.log("Token generated: "+ authToken);

    //step4: partial update for the same booking
    const patchPayload = await readingAPIpayload("patchdata");
    const patchResponse = await request.patch(`${BaseUrl}/booking/${bookingId}`,{headers:{
        'content-Type':'application/json',
        'Accept':'application/json',
        'cookie':`token=${authToken}`
    },data:patchPayload});

    //print the response

    const res3 = await patchResponse.json();
    console.log("partial updated booking is: ");
    console.log(res3);

    //assert status code
    expect(patchResponse.status()).toBe(200);
    console.log("current booking is partially updated successfully!");
    

})

test("Create new booking-->get the same booking-->Generate token-->Delete the booking", async({request})=>{

    //step1: create new booking

    const postPayload = await readingAPIpayload("postdata");
    const postResponse = await request.post(`${BaseUrl}/booking`,{headers:{'Content-Type':'application/json'},data:postPayload});

    //print the new booking details
    const res1 = await postResponse.json();
    console.log("new booking id created:", res1);

    //extract booking id
    const bookingId = res1.bookingid;
    console.log("New booking created with id: "+bookingId);

    //step2:get the same booking

    const getResponse = await request.get(`${BaseUrl}/booking/${bookingId}`);
    console.log("Get:get the booking details");
    console.log(await getResponse.json());
    
    //step3: Generate token
    const authPayload = await readingAPIpayload("authdata");
    const authResponse = await request.post(`${BaseUrl}/auth`,{headers:{'Content-Type':'application/json'},data:authPayload});
    
    //print response
    const res2 = await authResponse.json();
    console.log(res2);
    
    //extract token
    const authToken = res2.token;
    console.log("Token generated:"+authToken);
    
    //step4:partial update for the same booking
   const deleteRes =  await request.delete(`${BaseUrl}/booking/${bookingId}`,{headers:{'Content-Type':'application/json','cookie':`token=${authToken}`}})

    //status code should be 201 and message should be created

    expect(deleteRes.status()).toBe(201);
    console.log("status code is: "+ deleteRes.status());

    expect(deleteRes.statusText()).toBe("Created");
    console.log("status messsage is: ", deleteRes.statusText());
    
    //step5: get the deleted booking and validate 404 status code

    const getRes=await request.get(`${BaseUrl}/booking/${bookingId}`);
    
    console.log("Get: Get the booking details...");

    let rawres = await getRes.text();
    console.log(rawres);

    expect(getRes.status()).toBe(404);
    console.log("record is deleted! so"+getRes.statusText());
    
    
})