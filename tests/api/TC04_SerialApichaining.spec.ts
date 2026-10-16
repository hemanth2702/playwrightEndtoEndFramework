/*
API chaining
--------------
when we send request and response comming from one api we reused as prerequisite to other api
then it is called api chaining.

1. create new resource(post)--->bookingid---->sending get call(booking details)
2. create new resource(post)--->bookingid+ token from Auth API--->full update resource(PUT)
3. create new resource(post)--->bookingid+ token from Auth API--->partial update resource(PATCH)
4. create new resource(post)--->bookingid+ token from Auth API--->delete resource(DELETE)

//temporary understanding
In playwright all test cases execute in parallel
-current test case need to execute in sequence
test.describe.serial()

Note:
Test case should be independent, its executing parallelly--right technique to api testing. 

*/

import {test, expect} from "@playwright/test"
import { readingAPIpayload } from "../../src/utilities/readingAPI.js";

let baseURL= process.env.API_URL!;
let bookingId:number;
let token:string;

test.describe.serial("This is the suite for API chaining",()=>{

    test("POST:Create new Booking",async({request})=>{

        let payload = await readingAPIpayload("postdata");
        let response = await request.post(`${baseURL}/booking`,{headers:{
            "Content-Type": "application/json"
        }, data:payload});

        expect(response.status()).toBe(200);

        let jsonResponse = await response.json();
        console.log("booking created: ",jsonResponse);
        
        //id
        bookingId = jsonResponse.bookingid;
        console.log("Booking created with id: ", jsonResponse.bookingid);
        
    })

    //get booking details for new booking is added

    test("GET: Get the newly added booking details",async({request})=>{
        console.log("collecting the newly added booking details for id:....", bookingId);
        let response = await request.get(`${baseURL}/booking/${bookingId}`);

        expect(response.status()).toBe(200);

        //json response
        let jsonResponse = await response.json();
        console.log("booking details:", jsonResponse);
        
        
    })

    test("post:create new token for update and delete request", async({request})=>{

        console.log("post call to generate token.....");

        let payload = await readingAPIpayload("authdata");
        let response = await request.post(`${baseURL}/auth`,{headers:{
            "Content-Type": "application/json"
        },data:payload});

        expect(response.status()).toBe(200);

        //extract the token
        let jsonResponse = await response.json();
        token=jsonResponse.token;

        console.log(`API token is created ${token} for id ${bookingId}`);

    })

    test("PUT:Test for full update for current booking", async ({request})=>{
        console.log("updating full record....");

        //payload
        let payload = await readingAPIpayload("putdata");
        let response = await request.put(`${baseURL}/booking/${bookingId}`,{headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },data:payload});

        expect(response.status()).toBe(200);

        let jsonResponse = await response.json();
        console.log("full update record is...", jsonResponse);
        
        
    })

    test("PATCH: Update partial record", async({request})=>{
        console.log("updating partial record.....");

        //payload
        let payload = await readingAPIpayload("patchdata");
        let response = await request.patch(`${baseURL}/booking/${bookingId}`,{headers:{
            "Content-Type": "application/json",
             "Accept": "application/json",
            "Cookie": `token=${token}`
        },data:payload});

        expect(response.status()).toBe(200);

        let jsonResponse = await response.json();
        console.log("partial update record is....", jsonResponse);
        
        
    })

    //delete
    test("DELETE: Delete current record", async({request})=>{

        let response = await request.delete(`${baseURL}/booking/${bookingId}`,{headers:{
            "Content-Type" : "application/json",
            "Cookie": `token=${token}`
        }});

        expect(response.status()).toBe(201);
        console.log("status code is: "+ response.status());

        expect(response.statusText()).toBe("Created");
        console.log("status message is: "+ response.statusText());

        console.log("Record deleted for id: "+ bookingId);
        
        
        
    })
})