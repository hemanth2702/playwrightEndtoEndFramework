import {expect, test} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";
import { InventoryPage } from "../src/pages/InventoryPage.js";
import { log } from "console";

let loginPage:LoginPage;
let inventoryPage:InventoryPage;

test.beforeEach(async({page})=>{
//create object of pages
loginPage = new LoginPage(page);
await loginPage.gotoLoginPage();
await loginPage.doLogin("standard_user","secret_sauce");
inventoryPage = new InventoryPage(page);
})

test("test for total product count", async({})=>{
    let totalProduct = await inventoryPage.getProductCount();
    expect(totalProduct).toBe(6);
    console.log("total product matched: "+ totalProduct);
    
})

test("test for get the product details", async({})=>{
    let allProducts = await inventoryPage.getProductDetails();
    console.log(allProducts);
    expect(allProducts).toContain("Sauce Labs Bolt T-Shirt");
    console.log("Product foundd!");
    
})

test("test for add product to cart", async({})=>{
    inventoryPage.addProductIntoCart("Sauce Labs Bolt T-Shirt");
})