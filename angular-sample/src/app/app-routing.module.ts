import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard
} from 'microsoft-adal-angular6';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full',  canActivate: [AuthenticationGuard] },
  { path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthenticationGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
