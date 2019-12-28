import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

export interface Review {
  id: string;
  reviewerusername: string;
  rating: number;
  upvotes: number;
  downvotes: number;
  date: string;
  reviewedafter: any;
  content: string;
  reviewerboughtproduct: boolean;
  productid: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviews(product: string): Observable<Review[]> {
    let params = new HttpParams()
    params = params.set('phrase', product).set('pagesToSearch', '1').set('mapping', '11');
    return this.http.get<Review[]>('http://localhost:3000/extractPhrase', {params: params})
  }

  startETL(product: string): Observable<number> {
    let params = new HttpParams()
    params = params.set('phrase', product).set('pagesToSearch', '1').set('mapping', '123');
    return this.http.get<number>('http://localhost:3000/extractPhrase', {params: params})
  }
}
