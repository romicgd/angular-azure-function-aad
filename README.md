# Angular calls Azure Function protected by Azure AD 

Demo Angular calls Azure Function protected by Azure AD.

Build on top of Angular [Tour of Heroes App and Tutorial](https://angular.io/tutorial)

To configure
 
1. Update by adding ```MsAdalAngular6Module``` and ```functionURL``` to ```angular-azure-function-aad/angular-sample/src/environments/environment.xxx.ts```
in line with [microsoft-adal-angular6](https://www.npmjs.com/package/microsoft-adal-angular6) instructions
akin below

```typescript
export const environment = {
...
    MsAdalAngular6Module: {
      tenant: '<your-tenant-id>',
      clientId: '<your-client-id>',
      endpoints: { 
        "<function-url>": "<function-client-id>>"
      }  
    },
    functionURL: "<function-url>"  
};
	
```   

3. Create app registration in Azure
4. Use created app registration to configure Azure AD authentication for Azure function.     

Note: Even though Azure function is protected by Azure AD keeping Function-level authentication codes.
Just in case someone makes a mistake and removes AD protection with a single click in Azure portal. 


