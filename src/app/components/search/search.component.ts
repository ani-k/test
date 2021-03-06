import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ProductsService} from '../services/products.service';
import {ProductsResponse} from '../../models/products-response.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  attachScroll = false;

  form: FormGroup;

  @Output()
  products: EventEmitter<ProductsResponse> = new EventEmitter<ProductsResponse>();

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll, true);

    this.form = new FormGroup({
      url: new FormControl('', [Validators.required, Validators.minLength(4), this.checkUrl()])
    });

  }

  loadProducts() {
    const url = this.form.get('url').value;
    this.productsService.getProducts(url)
      .subscribe((response) => this.products.emit(response));
  }

  onScroll = (event: any): void => {
    const scrollTop = event.target.scrollingElement.scrollTop;
    this.attachScroll = scrollTop > 60;
  }

  searchProductInfo() {
    if (this.form.valid) {
      this.loadProducts();
    }
  }

  get url() {
    return this.form.get('url');
  }

  checkUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value.startsWith('https://www.amazon.com/')) {
        return null;
      } else {
        return {'wrong URL': {value: control.value}};
      }
    };
  }
}
