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
    return this.http.get<Review[]>("http://localhost:3000/displayData");
  }

  startETL(product: string): Observable<number> {
    let params = new HttpParams();
    params = params
      .set("phrase", product)
      .set("pagesToSearch", "1")
    return this.http.get<number>("http://localhost:3000/etl", {
      params: params
    });
  }

  startExtract(product: string): Observable<number> {
    let params = new HttpParams();
    params = params
      .set("phrase", product)
      .set("pagesToSearch", "1")
    return this.http.get<number>("http://localhost:3000/extract", {
      params: params
    });
  }

  startTransform(product: string): Observable<number> {
    return this.http.get<number>("http://localhost:3000/transform");
  }

  startLoad(product: string): Observable<number> {
    return this.http.get<number>("http://localhost:3000/load");
  }
}
