//Encapsulation = private data + public menthod
import {Locator, Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage
{

//locator
private readonly productList;
private readonly footerLinks;
private readonly addToCartButton;
private readonly cartOption;

//constructor
constructor(page:Page)
{
    super(page)
        this.productList=page.locator("div.inventory_container div.inventory_item_name");
        this.footerLinks=page.locator("footer a");
        this.addToCartButton=page.getByText("Add to cart")
        this.cartOption=page.locator("a.shopping_cart_link");
}

//methods

async getProductCount():Promise<number>
{
    return await this.productList.count();
}

async getProductDetails():Promise<string[]>
{
   return await this.productList.allInnerTexts();
}

async addProductIntoCart(pname:string)
{
   let allProducts:Locator[] = await this.productList.all()
   for(let Product of allProducts){
    let productName = await Product.innerText();
    //if((await Product.innerText()).includes(pname))
    if(productName.trim()===pname.trim())
    {
        //select
        await Product.click();
        break;
    //     console.log(pname + " : added into cart");
    //         return;
    // 
    }
    
   }
   //add the product into cart
    await this.addToCartButton.click();
    console.log(pname +" :added into cart");
  // throw new Error("Product not found: " + pname);
}

async getAllFooterCount():Promise<number>
{
    return await this.footerLinks.count();
}

async getAllFooterList():Promise<void>
{
    console.log("----footer link details----");
    
    let allFooters:Locator[] = await this.footerLinks.all();
    for(let f of allFooters)
    {
        console.log("link attribute value: "+ await f.getAttribute("href"));
        console.log("link text is: "+ await f.innerText());
    }
}

async gotoCartPage():Promise<void>
{
    await this.cartOption.click();
}

}