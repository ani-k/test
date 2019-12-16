import {Component} from '@angular/core';
import {ProductsResponse} from './models/products-response.model';
import {Product} from './models/product.model';
import {DescriptionResponse} from './models/description-response.model';
import {from, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {ProductsService} from './components/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {
  }

  onProductsUpdate(event: ProductsResponse) {
    event.products.forEach((product) => {
      this.products.push(
        product
      );
    });
    this.proceedProductsResponse(event);
  }

  proceedDescriptionResponse(response: DescriptionResponse) {
    if (!response) {
      return;
    }
    const currentProduct = this.products.find(product => product.asin === response.asin);
    currentProduct.description = response.description;
  }

  proceedProductsResponse(response: ProductsResponse) {
    from(response.products)
      .pipe(
        mergeMap(obj => {
          return this.productsService.getProductDescription(obj.asin, obj.link).pipe(
            catchError(val => {
              const errorResponse = new DescriptionResponse();
              errorResponse.asin = obj.asin;
              errorResponse.description = 'Error load description!';
              return of(errorResponse);
            })
          );
        }, 4)
      )
      .subscribe((description: DescriptionResponse) => this.proceedDescriptionResponse(description));
  }
}
