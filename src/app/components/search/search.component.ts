import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pis-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  attachScroll = false;

  constructor() {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll, true);
  }

  onScroll = (event: any): void => {
    const number = event.target.scrollingElement.scrollTop;
    this.attachScroll = number > 60;
  };

  searchProductInfo() {
    console.log('submited');
  };

}
