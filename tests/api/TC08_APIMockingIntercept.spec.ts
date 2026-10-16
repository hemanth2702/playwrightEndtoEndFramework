import {test} from '@playwright/test';

test("Test for API mocking  and intercept",async({page})=>{


    /*
    intercept current api
    ** /api--> here first * states any domain allowed and 2nd * states any path variable allowedNodeEnvironmentFlags.
    */
    await page.route("**/api/v1/fruits",async(routepath)=>{

        //created mock data/fake data
        const fakeData=[
            {id:1,name:'Apple'},
            {id:2,name:'Mango'}
        ]

        //mock the data and add as a server response
        //set this data as current server response
        routepath.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify(fakeData) //converting js data into json
        })
    })

    //real request
    await page.goto("https://demo.playwright.dev/api-mocking/");

    await page.waitForTimeout(2000);
})