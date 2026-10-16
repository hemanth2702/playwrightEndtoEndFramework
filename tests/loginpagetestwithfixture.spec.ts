import {test,expect} from "../src/fixtures/pagefixtures.js"
import { LoginPage } from "../src/pages/LoginPage.js";
import {readExcelFileSheetwise} from "../src/utilities/ExcelFileReading.js"
import { readExcelFileDDT } from "../src/utilities/ExcelDDT.js"

test("test for validating the url",async({loginPage})=>{
    let pageurl=await loginPage.getPageUrl();
    expect(pageurl).toBe("https://www.saucedemo.com/");
    console.log("current page url matched!: "+ pageurl);
    
})

test("test for validating title of the page",async({loginPage})=>{
    let pageTitle= await loginPage.getPageTitle();
    expect(pageTitle).toBe("Swag Labs");
    console.log("current page title matched!: "+pageTitle);
    
})


test("test for login functionality with valid credentials",async({loginPage,page})=>{
//     let data = readExcelFileSheetwise("loginData",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
await expect(page).toHaveURL(/inventory/);
console.log("user logedin successfully and navigated to inventory page");

})

test("test for invalid login functionality username and pwd is blank",async({loginPage})=>{
    await loginPage.doLogin("","");
    let errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe("Epic sadface: Username is required");
    console.log("Error message for blank username and password is validated: "+errorMessage);
    
})

let dataSet = readExcelFileDDT("dataDrivenTest");
for(let data of dataSet)
    {
    test(`test for invalid data for login ${data.id}`,async({loginPage})=>{
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.getErrorMessage()).toBeTruthy();
        console.log("Error message:" + await loginPage.getErrorMessage());
        
    })
}