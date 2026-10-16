//renaming playwright inbuilt fixtures so that modifications on its replica


import {test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import {InventoryPage} from "../pages/InventoryPage.js"
import {CartPage} from "../pages/CartPage.js";
import {CheckoutPage} from "../pages/CheckoutPage.js";
import { OverviewPage } from "../pages/OverviewPage.js";



//define the type of fixture
type pageFixtures={
    //fixturename:PageClassName
    loginPage:LoginPage;
    inventoryPage:InventoryPage;
    cartPage:CartPage;
    checkoutPage:CheckoutPage;
    overviewPage:OverviewPage;
}

//to create custome fixture we use test.extend() method
//we extends the baseTest as per the pageFixtures type

export const test=baseTest.extend<pageFixtures>({

    loginPage:async({page},use)=>{
let loginpage = new LoginPage(page);
await loginpage.gotoLoginPage();
//use is object which supply current fixture to test case
await use(loginpage);
    },

    inventoryPage:async({page},use)=>{
        let inventoryPage = new InventoryPage(page);
        await use (inventoryPage);
    },

    cartPage:async({page},use)=>{
        let cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage:async({page},use)=>{
        let checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    overviewPage:async({page},use)=>{
        let overviewPage = new OverviewPage(page);
        await use(overviewPage);
    }
    
})

export {expect} from "@playwright/test";