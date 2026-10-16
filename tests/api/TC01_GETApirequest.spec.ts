import {test, expect, APIResponse} from "@playwright/test"



let baseURL="https://restful-booker.herokuapp.com"

test("GET Request: Get request with baseurl", async({request})=>{

    let response:APIResponse = await request.get(`${baseURL}/booking`);

    console.log("status code is: ", response.status());
    console.log("status message is: ", response.statusText());


    //assertions
    //status code should be 200
    expect(response.status()).toBe(200);

    //status message should be OK
    expect(response.statusText()).toBe("OK");

    //console.log(await response.body()); //returns the buffer with response body

    //get the json response:Json()
    let jsonResponse =  await response.json(); //Returns the json representation of response body
    

    //get the response in text formate:text()
    let textResponse = await response.text(); //returns the text representation of response body
    console.log(textResponse);
    
})


test("GET Request: Get request for path and query parameters", async({request})=>{

    const firstName="Jim";
    let response:APIResponse = await request.get(`${baseURL}/booking`,{params:firstName});
    console.log("status code is: ", response.status());
    console.log("status message is: ", response.statusText());

    //json response
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    
    
    
})