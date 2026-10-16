import {Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class OverviewPage extends BasePage
{
    //locators
    private readonly productName;
    private readonly paymentDetails;
    private readonly finishButton;
    private readonly successMessage;

    //constructor
    constructor(page:Page)
    {
        super(page);
        this.productName=page.locator("div.inventory_item_name");
        this.paymentDetails=page.locator("div.summary_info div[class$='label']");
        this.finishButton=page.getByRole('button',{name:'Finish'});
        this.successMessage=page.getByRole('heading',{name:'Thank you for your order!',level:2});
    }

    //methods
    async getPurchaseProductDetails():Promise<string[]>
    {
        return await this.productName.allInnerTexts();
    }

    async getPaymentDetails():Promise<string[]>
    {
        return await this.paymentDetails.allInnerTexts();
    }

    async doFinishPurchase():Promise<void>
    {
        return await this.finishButton.click();
    }

    async getSuccessMessage():Promise<string>
    {
        return await this.successMessage.innerText();
    }
}