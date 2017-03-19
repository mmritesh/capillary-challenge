import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
const APP_ROUTES:Routes = [
  {
    path: '',
    redirectTo: '/appComponent',
    pathMatch: 'full'
  },
  {
    path: 'appComponent',
    component: AppComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }

