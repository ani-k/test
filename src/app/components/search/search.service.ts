import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ProductsResponse} from "../../models/products-response.model";

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductsResponse> {
    const headers = new HttpHeaders({
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'origin' : 'amazon.com'
    });

    return this.http.get<ProductsResponse>("http://localhost:8081/curl")
  }

  getProductDescription(url): Observable<string> {
    return this.http.get<string>(url);
  }

}
