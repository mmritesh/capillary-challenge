import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Page} from "./model/pagination";
import {DefinedConstants} from "./app.definedConstants";
import {SharedService} from "./shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(public router:Router){

  }

  ngOnInit(){
    this.routeToDashboard();
    this.initializePagination();
  }

  initializePagination(){
    let page = new Page();
    page.pageNo = DefinedConstants.PAGE_NO;
    page.noOfRows = DefinedConstants.NO_OF_ROWS;
    page.sortOrder = DefinedConstants.SORT_ORDER;
    page.sortBy = DefinedConstants.SORT_BY_TITLE;
    page.total = 100;
    sessionStorage.setItem("page", JSON.stringify(page));
  }
  routeToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
