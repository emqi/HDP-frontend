import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

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

export interface ClearResponse {
  finished: boolean;
}

export interface Statistics {
  products?: number;
  reviews: number;
}

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>("http://localhost:3000/displayData");
  }

  startETL(product: string): Observable<Statistics> {
    let params = new HttpParams();
    params = params.set("phrase", product).set("pagesToSearch", "1");
    return this.http.get<Statistics>("http://localhost:3000/etl", {
      params: params
    });
  }

  startExtract(product: string): Observable<Statistics> {
    let params = new HttpParams();
    params = params.set("phrase", product).set("pagesToSearch", "1");
    return this.http.get<Statistics>("http://localhost:3000/extract", {
      params: params
    });
  }

  startTransform(): Observable<Statistics> {
    return this.http.get<Statistics>("http://localhost:3000/transform");
  }

  startLoad(): Observable<Statistics> {
    return this.http.get<Statistics>("http://localhost:3000/load");
  }

  clearDatabase(): Observable<ClearResponse> {
    return this.http.get<ClearResponse>("http://localhost:3000/clearDb");
  }

  downloadCSV() {
    return this.http
      .get("http://localhost:3000/csv", {
        headers: new HttpHeaders({
          Accept: 'text/csv'
        }),
        responseType: "text"
      })
      .subscribe(response => this.downloadFile(response, "text/csv;charset=utf-8"));
  }

  downloadFile(data: any, fileType: string) {
    let blob = new Blob(["\ufeff"+data], { type: fileType });
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "Database.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
