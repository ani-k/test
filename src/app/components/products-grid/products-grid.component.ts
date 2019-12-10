import {Component, Input, OnInit} from '@angular/core';
import {ProductsResponse} from "../../models/products-response.model";
import {Product} from "../../models/product.model";

@Component({
  selector: 'pis-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.less']
})
export class ProductsGridComponent implements OnInit {

  @Input()
  products: Product[];

  constructor() { }

  ngOnInit() {
  }

}
