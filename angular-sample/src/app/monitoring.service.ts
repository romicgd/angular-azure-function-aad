import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private routerSubscription: Subscription;

  private appInsights = new ApplicationInsights({
    config: {
      // Application Insigts instrumentation key
      instrumentationKey: environment.appInsights.instrumentationKey
    }
  });

  constructor(private router: Router, private messageService: MessageService) {
    this.appInsights.loadAppInsights();
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof ResolveEnd)).subscribe((event: ResolveEnd) => {
      const activatedComponent = this.getActivatedComponent(event.state.root);
      if (activatedComponent) {
        this.messageService.add(`Logging to AI ${this.appInsights.config.instrumentationKey}`);
        this.logPageView(`Log from Angular ${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`, event.urlAfterRedirects);
      }
    });
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
    this.appInsights.flush();
  }

  logTrace(traceMessage: string) {
    this.appInsights.trackTrace({message: traceMessage});
    this.appInsights.flush();
  }


  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}