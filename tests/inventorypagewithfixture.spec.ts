import {test,expect} from "../src/fixtures/pagefixtures.js"
import { InventoryPage } from "../src/pages/InventoryPage.js";
import { LoginPage } from "../src/pages/LoginPage.js";
import {readExcelFileSheetwise} from "../src/utilities/ExcelFileReading.js"

// test.beforeEach(async({loginPage})=>{
//     await loginPage.doLogin("standard_user","secret_sauce");
// })

test("test for product count match",async({loginPage, inventoryPage})=>{
      let data = readExcelFileSheetwise("loginData",0);
    await loginPage.doLogin(data.username,data.password);
    let totalProducts =await inventoryPage.getProductCount();
    expect(totalProducts).toBe(6);
    console.log("total products matched: "+ totalProducts);
})

test("to validate product details", async({loginPage, inventoryPage})=>{
      let data = readExcelFileSheetwise("loginData",0);
    await loginPage.doLogin(data.username,data.password);;
    let allProducts = await inventoryPage.getProductDetails();
console.log(allProducts);
expect(allProducts).toContain("Sauce Labs Bolt T-Shirt");
console.log("product found");
})


test("test for add product into cart",async({loginPage, inventoryPage})=>{
//   let data = readExcelFileSheetwise("loginData",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    let ivpagedata = readExcelFileSheetwise("inventoryPage",0)
    await inventoryPage.addProductIntoCart(ivpagedata.productname1);
})

test("test for total footers count validation", async({loginPage,inventoryPage})=>{
//   let data = readExcelFileSheetwise("loginData",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
let totalFooters =await inventoryPage.getAllFooterCount();
expect(totalFooters).toBe(3);
console.log("total footers count match: "+ totalFooters);

})

test("test for get footers details", async({loginPage, inventoryPage})=>{

//   let data = readExcelFileSheetwise("loginData",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
await inventoryPage.getAllFooterList();
})