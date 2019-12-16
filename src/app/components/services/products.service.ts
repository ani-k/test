import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductsResponse} from '../../models/products-response.model';
import {DescriptionResponse} from '../../models/description-response.model';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  getProducts(url): Observable<ProductsResponse> {
    const encoded = encodeURI(url);
    const headers = new HttpHeaders({
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      origin: 'amazon.com'
    });

    return this.http.get<ProductsResponse>('http://localhost:8083/curl?url=' + encoded);
  }

  getProductDescription(asin, link): Observable<DescriptionResponse> {
    const encoded = encodeURI(link);
    return this.http.get<DescriptionResponse>('http://localhost:8083/desc/' + asin + '?url=' + encoded);
  }

}
