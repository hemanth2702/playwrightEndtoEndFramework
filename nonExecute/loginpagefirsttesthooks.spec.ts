import {expect, test} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

///AAA: arrange(precondition)--->act(design test)---> assert(validation)

let loginPage:LoginPage;

test.beforeEach(async({page})=>{
loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
})

test("Test for validate url", async ({})=>{

    
    let actUrl = await loginPage.getAppUrl();
    expect(actUrl).toBe("https://www.saucedemo.com/")
    console.log("current url is: "+ actUrl);
})

test("Test for validate title", async({page})=>{
    // let loginpage = new LoginPage(page);
    // await loginpage.gotoLoginPage();
    let appTitle = await loginPage.getAppTitle();
    expect(appTitle).toBe("Swag Labs");
    console.log("Application title is: "+ appTitle);

})    

    test("Test for Login Feature", async ({page})=>{

        // let loginpage = new LoginPage(page);
        // await loginpage.gotoLoginPage();
        await loginPage.fillUsername("standard_user");
        await loginPage.fillPassword("secret_sauce");
        await loginPage.clickOnLogin();
        expect(page).toHaveURL(/inventory/);
        console.log("user login successfully and navigated to inventory page");
        
    })
