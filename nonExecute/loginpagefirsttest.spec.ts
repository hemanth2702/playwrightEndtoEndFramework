import {expect, test} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

///AAA: arrange(precondition)--->act(design test)---> assert(validation)

test("Test for validate url", async ({page})=>{

    let loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    let actUrl = await loginPage.getAppUrl();
    expect(actUrl).toBe("https://www.saucedemo.com/")
    console.log("current url is: "+ actUrl);
})

test("Test for validate title", async({page})=>{
    let loginpage = new LoginPage(page);
    await loginpage.gotoLoginPage();
    let appTitle = await loginpage.getAppTitle();
    expect(appTitle).toBe("Swag Labs");
    console.log("Application title is: "+ appTitle);

})    

    test("Test for Login Feature", async ({page})=>{

        let loginpage = new LoginPage(page);
        await loginpage.gotoLoginPage();
        await loginpage.fillUsername("standard_user");
        await loginpage.fillPassword("secret_sauce");
        await loginpage.clickOnLogin();
        expect(page).toHaveURL(/inventory/);
        console.log("user login successfully and navigated to inventory page");
        
    })
