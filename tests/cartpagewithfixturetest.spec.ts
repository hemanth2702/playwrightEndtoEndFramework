import {test, expect} from "../src/fixtures/pagefixtures.js"
import { CartPage } from "../src/pages/CartPage.js";
import { readExcelFileSheetwise } from "../src/utilities/ExcelFileReading.js";

test.beforeEach(async({loginPage, inventoryPage})=>{
    // let data = readExcelFileSheetwise("loginData",0)
    // await loginPage.doLogin(data.username,data.password);
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
      let ivpagedata = readExcelFileSheetwise("inventoryPage",0)
    await inventoryPage.addProductIntoCart(ivpagedata.productname1);
})

test("test for cart page launch",async({cartPage})=>{
await cartPage.gotoCartPage();
expect(await cartPage.getPageUrl()).toContain("cart");
console.log("user navigated to cart page!");

})

test("test for getcart product details", async({cartPage})=>{
  await cartPage.gotoCartPage();
  let details = await cartPage.getCartProductDetails();
  console.log(details);

   expect(details[0]).toBe("Sauce Labs Bolt T-Shirt");
   console.log("product validation is done!");
})

test("test for remove product",async({cartPage})=>{

  await cartPage.gotoCartPage();
  await cartPage.removeProduct();
  expect((await cartPage.getCartProductDetails()).length).toBe(0);
  console.log("product removed from the cart!");
  
})

test("test for continue shopping and add new product into cart", async({cartPage, inventoryPage})=>{
  await cartPage.gotoCartPage();
  await cartPage.doContinueShopping();
  //product2
  let ivpagedata =readExcelFileSheetwise("inventoryPage",0);
  await inventoryPage.addProductIntoCart(ivpagedata.productname2);
  await inventoryPage.waitUtil();
  await inventoryPage.gotoCartPage();
  let data= await cartPage.getCartProductDetails();
  console.log("total product added: "+ data.length);
  expect(data[1]).toBe("Sauce Labs Backpack")
  
})

test("test validate chcekout page launch", async({cartPage})=>{
  await cartPage.gotoCartPage();
  await cartPage.gotoCheckOutPage();
  expect(await cartPage.getPageUrl()).toBe("https://www.saucedemo.com/checkout-step-one.html");
  console.log("user navigated to checkout page!");
  
})