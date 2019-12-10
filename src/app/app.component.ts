import {Component} from '@angular/core';
import {ProductsResponse} from "./models/products-response.model";
import {Product} from "./models/product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'test';
  products: Product[] = [];

  onProductsUpdate(event: ProductsResponse) {
    event.products.forEach((product) => {
      this.products.push(
          product
      );
    });
  }
}
