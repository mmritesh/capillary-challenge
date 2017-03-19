import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  searchString:string;
  @Output() updateSearchValue: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  emit(value){
    console.log("setting page No");
    let page = JSON.parse(sessionStorage.getItem('page'));
    page.pageNo = 1;
    sessionStorage.setItem("page", JSON.stringify(page));
    console.log("Emmitted: " + this.searchString);
    this.updateSearchValue.emit(this.searchString);
  }
}
