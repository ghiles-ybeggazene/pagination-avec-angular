import { Component, OnInit, OnDestroy } from '@angular/core';
import { StarwarsService } from './../starwars.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  swService: StarwarsService;
  items = [];
  subscription;
  page = 1;
  pages = [];
  dataType = 'people';
  activatedRoute: ActivatedRoute;

  constructor(swService: StarwarsService, activatedRoute: ActivatedRoute) {
    this.swService = swService;
    this.activatedRoute = activatedRoute;
   }

  ngOnInit() {
     this.activatedRoute.params.subscribe(
      (params) => {
        this.page = 1;
        this.dataType = params.dataType;
        this.swService.fetchData(this.dataType, this.page);
      }
    );
    this.swService.fetchData(this.dataType, this.page);
    this.subscription = this.swService.signal.subscribe(
      () => {
        this.items = this.swService.showItems();
        this.pages = this.swService.passPages();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadNextPage() {
    this.page++;
    this.swService.fetchData(this.dataType, this.page);
  }
  loadPreviousPage() {
    this.page--;
    this.swService.fetchData(this.dataType, this.page);
  }
  jumpOnPage(number) {
    this.page = number;
    this.swService.fetchData(this.dataType, this.page);
  }

}
