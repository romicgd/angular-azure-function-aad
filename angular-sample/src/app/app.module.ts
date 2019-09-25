import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard
} from 'microsoft-adal-angular6';
import { InsertAuthTokenInterceptor } from './insert-auth-token-interceptor';
import { environment } from '../environments/environment';

let adalConfig: any; // will be initialized by APP_INITIALIZER
export function msAdalAngular6ConfigFactory() {
return adalConfig; // will be invoked later when creating MsAdalAngular6Service
}

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MsAdalAngular6Module.forRoot({
      tenant: environment.MsAdalAngular6Module.tenant,
      clientId: environment.MsAdalAngular6Module.clientId,
      redirectUri: window.location.origin,
      endpoints: environment.MsAdalAngular6Module.endpoints,
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage', 
    })      ],
  providers: [
    AuthenticationGuard,
    MsAdalAngular6Service,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InsertAuthTokenInterceptor,
      multi: true
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
