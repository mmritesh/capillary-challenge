import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Page} from "./model/pagination";
import {DefinedConstants} from "./app.definedConstants";
import {SharedService} from "./shared";
import {Service} from "./service/service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(public router:Router, public service:Service, public sharedService:SharedService){

  }
  page:Page = new Page() ;

  ngOnInit(){
    this.initializePagination();
  }

  getCount(){
    this.sharedService.isAppLoading = true;
    this.service.getCount().subscribe(
        response => {
          let count = parseInt(response);
          console.log("Count: " + count);
          this.sharedService.isAppLoading = false;
          this.page.total = count;
          sessionStorage.setItem("page", JSON.stringify(this.page));
          this.routeToDashboard();
        },
        error => {
          alert("Error in communication");
          this.sharedService.isAppLoading = false;
        }
    );
  }
  initializePagination(){
    this.page.pageNo = DefinedConstants.PAGE_NO;
    this.page.noOfRows = DefinedConstants.NO_OF_ROWS;
    this.page.sortOrder = DefinedConstants.SORT_ORDER;
    this.page.sortBy = DefinedConstants.SORT_BY_TITLE;
    this.getCount();
  }
  routeToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
