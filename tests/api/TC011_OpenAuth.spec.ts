/*
OAuth (open Authorization) is a protocol used for access delegation,
where resource owners grant third-party application access to their
resources without sharing their user credentials.

https://medium.com/identity-beyond-borders/oauth-1-0-vs-oauth-2-0-e36f8924a835

Oauth2.0
GET https://api.github.com/user/repos

1. create Application in Github
2. get the client_Id= and client_Secret= 
3. Click on update application button
4. Set the id to url https://github.com/login/oauth/authorize?client_id=
and send this through browser.
5. Click on Authorize button. You will get auth code.
6. In response, user redirected to url and get the code within url
7. Get the access token https://github.com/login/oauth/access_token?client_id= &client_secret=&code=

*/

// import {test} from "@playwright/test"

// test("open auth 2.0 test",async({request})=>{
//     let baseUrl="https://github.com/login/oauth/access_token";
//     let queryParam = {
//         //for client id go to settings/developer settings --> Oauth Apps --> click on your app and get the client id
//         client_id:"",
//         //for code run this url on browser https://github.com/login/oauth/authorize?client_id=
//         code:"494f4b9f11b2a423f92b"
//     }
//     //send the request and get the access token.
//     let tokenRes = await request.get(`${baseUrl}`,{headers:{
//         Accept:"application/json"
//     },params:queryParam})

//     let jsonRes = await tokenRes.json();
//     console.log(jsonRes);
    
//     //get the token
//     let token = jsonRes.access_token;

//     let authToken={Autorization:`Bearer ${token}`}

//     //send the request to access github repo
//     let response = await request.get("https://api.github.com/user/repos",{headers:authToken})

// console.log(await response.json());

// })