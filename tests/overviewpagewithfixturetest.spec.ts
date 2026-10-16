import {expect, test} from "../src/fixtures/pagefixtures.js";
import {readExcelFileSheetwise} from "../src/utilities/ExcelFileReading.js";

test.beforeEach(async({loginPage, inventoryPage,cartPage})=>{

    // let data =readExcelFileSheetwise("loginData",0);
    // await loginPage.doLogin(data.username, data.password);
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    let ivnpageData = readExcelFileSheetwise("inventoryPage",0);
    await inventoryPage.addProductIntoCart(ivnpageData.productname1);
    await cartPage.gotoCartPage();
    await cartPage.gotoCheckOutPage();

})

test("test for complete checkout process",async({checkoutPage, overviewPage})=>{
let data = readExcelFileSheetwise("checkoutPage",0);
await checkoutPage.doContinueCheckout(data.firstname,data.lastname,data.postalcode);
await overviewPage.doFinishPurchase();
let paymentDetails = await overviewPage.getPaymentDetails();
console.log(paymentDetails);
let message = await overviewPage.getSuccessMessage();
expect(message).toBe("Thank you for your order!");

})