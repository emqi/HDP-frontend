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

export interface clearResponse {
  finished: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
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

  startTransform(): Observable<number> {
    return this.http.get<number>("http://localhost:3000/transform");
  }

  startLoad(): Observable<number> {
    return this.http.get<number>("http://localhost:3000/load");
  }

  clearDatabase(): Observable<clearResponse> {
    return this.http.get<clearResponse>("http://localhost:3000/clearDb");
  }
}
