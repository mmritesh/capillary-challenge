import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DefinedConstants} from "../../app.definedConstants";
import {Service} from "../../service/service";
import {SharedService} from "../../shared";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(public router:Router, public leaveService:Service, public sharedService:SharedService) {
    }

    public gameList;
    public searchString;
    public page;
    public pageArray;

    ngOnInit() {
        this.page = JSON.parse(sessionStorage.getItem('page'));
        this.getGames();
        this.initPageCount();
    }

    initPageCount(){
        let n = this.page.total / this.page.noOfRows;
        if ( this.page.total % this.page.noOfRows > 0 )
            n = n + 1;
        this.pageArray =   new Array();
        for(let i = 0; i<n; i++){
            this.pageArray.push(i);
        }
    }
    getGames() {
        let searchString;
        this.searchString == undefined ? searchString = "" : searchString = this.searchString;
        this.sharedService.isAppLoading = true;
        this.leaveService.getGamesByName(searchString).subscribe(
            response => {
                this.gameList = response;
                this.sharedService.isAppLoading = false;
            },
            error => {
                alert("Error in communication");
                this.sharedService.isAppLoading = false;
            }
        );
    }

    search(searchString) {
        this.page = JSON.parse(sessionStorage.getItem('page'));
        this.searchString = searchString;
        this.getGames();
    }

    nextPage(pageNo) {
        this.page.pageNo = pageNo;
        console.log(this.page.pageNo);
        sessionStorage.setItem("page", JSON.stringify(this.page));
        this.getGames();
    }

    setActive(i){
        if(i == this.page.pageNo){
            return true;
        }
        else {
            return false;
        }
    }


    rowChange(){
        sessionStorage.setItem("page", JSON.stringify(this.page));
        this.getGames();
    }

    filterByScore(){
        console.log("filter");
        this.page.sortBy = DefinedConstants.SORT_BY_SCORE;
        if(this.page.sortOrder == DefinedConstants.ASC)
            this.page.sortOrder = DefinedConstants.DESC;
        else
            this.page.sortOrder = DefinedConstants.ASC;
        sessionStorage.setItem("page", JSON.stringify(this.page));
        this.getGames();
    }

    filterByPlatform(){
        console.log("filter");
        this.page.sortBy = DefinedConstants.SORT_BY_PLATFORM;
        if(this.page.sortOrder == DefinedConstants.ASC)
            this.page.sortOrder = DefinedConstants.DESC;
        else
            this.page.sortOrder = DefinedConstants.ASC;
        sessionStorage.setItem("page", JSON.stringify(this.page));
        this.getGames();
    }

    defaultOrder(){
        this.page.pageNo = DefinedConstants.PAGE_NO;
        this.page.noOfRows = DefinedConstants.NO_OF_ROWS;
        this.page.sortOrder = DefinedConstants.SORT_ORDER;
        this.page.sortBy = DefinedConstants.SORT_BY_TITLE;
        this.page.total = 100;
        sessionStorage.setItem("page", JSON.stringify(this.page));
        this.getGames();
    }
    
}
