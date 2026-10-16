//https://learning.postman.com/docs/use/send-requests/authorization/authorization-types#basic-auth

import {APIResponse, expect, test} from "@playwright/test";
import {readingAPIpayload} from "../../src/utilities/readingAPI.js"

test("Test for NoAuth authentication algorithm",async({request})=>{

    const response:APIResponse = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    //validate status code
    expect(response.status()).toBe(200);
    console.log("status code matched!"+ response.status());
    
    //get the response body
    const jsonREs = await response.json();
    console.log(jsonREs);
    

})

test("Test for basic Authentication", async({request})=>{

    const username="postman";
    const password="password";

    //encode data in base64: Buffer package
    let bufferedIntobase64 = Buffer.from(`${username}:${password}`).toString("base64");
    console.log(bufferedIntobase64);

    const response =await request.get("https://postman-echo.com/basic-auth",{headers:
        {
        Authorization:`Basic ${bufferedIntobase64}`
    }
});

console.log(response.status());
console.log(await response.text());
expect(response.status()).toBe(200);


    
})


test("Test for API key",async({request})=>{

//get api key from https://app.reqres.in/dashboard
    const apiKey="reqres_5c0527b3b9704e00bf7cff72876ec269";

const response = await request.get("https://reqres.in/api/users?page=2", {headers:{
    'x-api-key':`${apiKey}`
}});

expect(response.status()).toBe(200);
console.log(await response.json());


})

test("test for bearer token",async({request})=>{

    const token = process.env.ACCESSTOKEN!;

    //let payload = await readingAPIpayload("gorestdata");

    let email ="Hemanth"+new Date().getTime()+"@gmail.com";
    let payload = {
         "name":"Hemanth",
    "email":email,
    "gender":"male",
    "status":"active"
    }

    const response = await request.post("https://gorest.co.in/public/v2/users",{headers:{
        Authorization: `Bearer ${token}`
    },data:payload});

expect(response.status()).toBe(201);

console.log(await response.json());

})