import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {error} from "util";
import {SearchService} from "./search.service";

@Component({
  selector: 'pis-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  attachScroll = false;

  form: FormGroup;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll, true);

    this.form = new FormGroup({
      url: new FormControl('', Validators.required, this.checkUrl)
    });

  }

  loadProducts() {
    this.searchService.getProducts()
      .subscribe((responce => {
        console.log(responce);
      }));
  }

  onScroll = (event: any): void => {
    const number = event.target.scrollingElement.scrollTop;
    this.attachScroll = number > 60;
  };

  searchProductInfo() {
    console.log('submited');
  };

  checkUrl(control: FormControl) {
    if (!control.value) {
      return ;
    }
    return null;
  }

}
