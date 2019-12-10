import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {error} from "util";
import {SearchService} from "./search.service";
import {HttpResponse} from "@angular/common/http";
import {ProductsResponse} from "../../models/products-response.model";
import {Product} from "../../models/product.model";

@Component({
  selector: 'pis-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  attachScroll = false;

  form: FormGroup;

  @Output()
  products: EventEmitter<ProductsResponse> = new EventEmitter<ProductsResponse>();

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll, true);

    this.form = new FormGroup({
      url: new FormControl('', Validators.required)
    });

  }

  loadProducts() {
    this.searchService.getProducts()
      .subscribe(((response) => {

        response.products.forEach(product => {
            // this.searchService.getProductDescription(product.link).subscribe(descr => product.description = descr);

            console.log(product.link);
          }
        );

        this.products.emit(response);
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
      return;
    }
    return null;
  }

}
