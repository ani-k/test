import {Component, Input} from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.less']
})
export class ProductsGridComponent {

  @Input()
  products: Product[];

  constructor() { }

}
