import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {AppRoutingModule} from "./app.routing";
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { Md2Module }  from 'md2';
import {Service} from "./service/service";
import {SharedService} from "./shared";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Md2Module
  ],
  providers: [Service, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
