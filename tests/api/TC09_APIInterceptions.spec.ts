//API interception and moking

import { test} from "@playwright/test"

test("API-Interception-observe request",async({page})=>{

    /*
    intercepting the main url to show you how many request internally goes to server total 5 you will see
    
     ** /* --> domain, path and filter option could be anything.
    */

    await page.route("**/*",async(routepath)=>{

        console.log("API intercepted!");
        console.log("URL:"+routepath.request().url());
        console.log("RequestMethod:" + routepath.request().method());

        await routepath.continue(); //send the request to real server
        
        
    })

    await page.goto("https://demo.playwright.dev/api-mocking/");
})

test("API-Interception-observe single rwquest",async({page})=>{

    /*
    Intercepting the only single url to show you one request internally goes to server.

    */

    await page.route("**/api/v1/fruits",async(routepath)=>{
        console.log("API intercepted!");
        console.log("URL: "+ routepath.request().url());
        console.log("RequestMethod: "+ routepath.request().method());

        await routepath.continue(); //send the request to real server
        
    })

    await page.goto("https://demo.playwright.dev/api-mocking/");

})

test("API Interception - to block any API request", async({page})=>{

    await page.route("https://demo.playwright.dev/api-mocking/api/v1/fruits",async(routepath)=>{

        console.log("Request Intercepted!");
        await routepath.abort(); //abort the route's request.
        
    })

})

test("API Interception- moke the response", async({page})=>{

    //intercept it
    await page.route("https://jsonplaceholder.typicode.com/users/1",async(routepath)=>{

        //moke data
        let data={
            id:101,
            fname:"sarang",
            location:"pune"
        }

        //mock data we can send ads response from the server.

        routepath.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify(data)//js object to json
        })
    })

    await page.goto("https://jsonplaceholder.typicode.com/users/1")
    await page.waitForTimeout(2000);
})


test("API Interception-Moking the current response", async({page})=>{

    //intercepting: route()

    await page.route("https://tutorialsninja.com/demo/index.php?route=product/search&search=macbook",async(routepath)=>{

        //mock data
        let fakeProducts=[
            {pid:101,pname:'Macbook pro12',price:98000},
            {pid:102,pname:'macbook pro13',price:95000},
            {pid:103,pname:'macbook pro14',price:97000}
        ]

        //send mock data as server response
        routepath.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify(fakeProducts)
        })
    })

    await page.goto("https://tutorialsninja.com/demo/index.php?route=product/search&search=macbook");
    await page.waitForTimeout(2000);
})