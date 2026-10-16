import {test, expect} from "@playwright/test"

const baseURL="https://restful-booker.herokuapp.com";

test("POST Request: Create new resource with manual payload", async({request})=>{

    let payload={
    firstname: "Sally",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
        checkin: "2026-09-15",
        checkout: "2014-09-16"
    },
    additionalneeds: "Breakfast"
}

let response = await request.post(`${baseURL}/booking`,{headers:{
    "Content-Type": "application/json"
},
data:payload}); //data will convert jsObject into Json string

//assertion
expect(response.status()).toBe(200);
console.log("status code is: ", response.status());

expect(response.statusText()).toBe("OK");
console.log("status message is: "+ response.statusText());

//json response
let jsonResponse = await response.json();
console.log(jsonResponse);

//response validation
//to validate response property
expect(jsonResponse).toHaveProperty("bookingid");

//bookingid should be number type
//jsonResponse.bookingid -->bookingid path
expect(jsonResponse.bookingid).toEqual(expect.any(Number));

//first name should be string type
expect(jsonResponse.booking.firstname).toEqual(expect.any(String));

//depositpaid: true,
expect(jsonResponse.booking.depositpaid).toEqual(expect.any(Boolean));

//validate value
//firstname:
expect(jsonResponse.booking.firstname).toBe("Sally");
console.log("First name matched: ", jsonResponse.booking.firstname);


//to validate data/fields of object
//first for booking object
let bookingObject = jsonResponse.booking;
expect(bookingObject).toMatchObject({
    firstname: "Sally",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
        checkin: "2026-09-15",
        checkout: "2014-09-16"
    },
    additionalneeds: "Breakfast"
});

//second for bookingdates object
let bookingdatesObject = jsonResponse.booking.bookingdates;
expect(bookingdatesObject).toMatchObject({
        checkin: "2026-09-15",
        checkout: "2014-09-16"
    })

})