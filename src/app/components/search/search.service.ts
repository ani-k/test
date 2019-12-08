import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Object> {
    const headers = new HttpHeaders({
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'origin' : 'amazon.com'
    });

    return this.http.get("http://localhost:8081/curl")
  }
}
