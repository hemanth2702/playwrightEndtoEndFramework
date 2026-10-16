/*
Every page class maintain Encapsulation principle
Encapsulation=Private data+public function
*/

import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage
{

    //locator(data)
    private readonly userName;
    private readonly password;
    private readonly loginButton;
    private readonly errorheading;

    //constructor to initialize locator
    constructor(page:Page){
        super(page);
        this.userName=page.getByPlaceholder("Username");
        this.password=page.getByPlaceholder("Password");
        this.loginButton=page.getByRole('button',{name:"Login"});
        this.errorheading=page.locator("//h3[@data-test='error']");
    }

    //methods(action)

    async gotoLoginPage():Promise<void>
    {
        await this.page.goto("/"); //real url from baseurl variable from playwright configuration
    }

    // async getAppTitle():Promise<string>
    // {
    //     return await this.page.title();
    // }

    // async getAppUrl():Promise<string>
    // {
    //     return this.page.url();
    // }

    async fillUsername(un:string):Promise<void>
    {
        await this.userName.fill(un);
    }

    async fillPassword(pw:string):Promise<void>
    {
        await this.password.fill(pw);
    }

    async clickOnLogin():Promise<void>
    {
        await this.loginButton.click();

        }

        async doLogin(un:string,pw:string):Promise<void>
        {
            await this.userName.fill(un);
            await this.password.fill(pw);
            await this.loginButton.click();
        }

        async getErrorMessage():Promise<string>
        {
            return await this.errorheading.innerText();
        }
    
    }


