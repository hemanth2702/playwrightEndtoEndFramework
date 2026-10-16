import {test, expect} from "../src/fixtures/pagefixtures.js";
import { readExcelFileSheetwise } from "../src/utilities/ExcelFileReading.js";


test.beforeEach(async({loginPage, inventoryPage, cartPage})=>{
// let data = readExcelFileSheetwise("loginData",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
//await inventoryPage.waitUtil();
let ivnPagedata = readExcelFileSheetwise("inventoryPage",0);
await inventoryPage.addProductIntoCart(ivnPagedata.productname1);
await cartPage.gotoCartPage();
await cartPage.gotoCheckOutPage();

})

test("test for valid checkout process",async({checkoutPage})=>{
let data = readExcelFileSheetwise("checkoutPage",0);
await checkoutPage.doContinueCheckout(data.firstname,data.lastname,data.postalcode);
expect(await checkoutPage.getPageUrl()).toBe("https://www.saucedemo.com/checkout-step-two.html");
})

test("test for cancel checkout process",async({checkoutPage})=>{
await checkoutPage.doCancleProcess();
expect(await checkoutPage.getPageUrl()).toBe("https://www.saucedemo.com/cart.html");
})