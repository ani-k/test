import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class SearchService {
  constructor( private http: HttpClient) {
  }

  getProducts () {
    return this.http.get("https://www.amazon.com/s?k=iphone+5s")
  }
}
