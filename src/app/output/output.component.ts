import { Component, OnInit, Input, HostListener } from "@angular/core";
import { Review, ReviewService } from "../review-service/review.service";

@Component({
  selector: "app-output",
  template: `
    <div class="default-container" *ngIf="!isStarted">
      <span class="warning" *ngIf="showWarning"
        >Podaj poszukiwany produkt oraz liczbę stron w zakresie 1-999.</span
      >
      <span class="info"
        >Rozpocznij proces ETL lub jeden z jego pojedynczych kroków za pomoca
        przycisków powyżej.
      </span>
    </div>
    <div class="output-container" *ngIf="isStarted">
      <app-progress-bar *ngIf="!isDone"></app-progress-bar>
      <div class="content-container">
        <div class="stats-container" *ngIf="etlStats">
          <mat-card class="stats">{{ etlStats }}</mat-card>
        </div>
        <mat-table
          *ngIf="etlData"
          class="lessons-table mat-elevation-z8"
          [dataSource]="etlData"
        >
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>Id recencji</th>
            <td mat-cell *matCellDef="let review">{{ review.id }}</td>
          </ng-container>
          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef>Nazwa użytkownika</th>
            <td mat-cell *matCellDef="let review">
              {{ review.reviewerusername }}
            </td>
          </ng-container>
          <ng-container matColumnDef="rating">
            <th mat-header-cell *matHeaderCellDef>Ocena</th>
            <td mat-cell *matCellDef="let review">{{ review.rating }}</td>
          </ng-container>
          <ng-container matColumnDef="upvotes">
            <th mat-header-cell *matHeaderCellDef>Głosy "za"</th>
            <td mat-cell *matCellDef="let review">{{ review.upvotes }}</td>
          </ng-container>
          <ng-container matColumnDef="downvotes">
            <th mat-header-cell *matHeaderCellDef>Głosy "przeciw"</th>
            <td mat-cell *matCellDef="let review">{{ review.downvotes }}</td>
          </ng-container>
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Data wystawienia</th>
            <td mat-cell *matCellDef="let review">{{ review.date | date }}</td>
          </ng-container>
          <ng-container matColumnDef="reviewedAfter">
            <th mat-header-cell *matHeaderCellDef>Oceniono po dniach</th>
            <td mat-cell *matCellDef="let review">
              {{ review.reviewedafter }}
            </td>
          </ng-container>
          <ng-container matColumnDef="content">
            <th mat-header-cell *matHeaderCellDef>Treść opini</th>
            <td mat-cell *matCellDef="let review">{{ review.content }}</td>
          </ng-container>
          <ng-container matColumnDef="bought">
            <th mat-header-cell *matHeaderCellDef>
              Czy recenzujący kupił produkt
            </th>
            <td mat-cell *matCellDef="let review">
              {{ review.reviewerboughtproduct }}
            </td>
          </ng-container>
          <ng-container matColumnDef="productId">
            <th mat-header-cell *matHeaderCellDef>Id produktu</th>
            <td mat-cell *matCellDef="let review">{{ review.productid }}</td>
          </ng-container>
          <ng-container matColumnDef="prodName">
            <th mat-header-cell *matHeaderCellDef>Nazwa produktu</th>
            <td mat-cell *matCellDef="let review">{{ review.name }}</td>
          </ng-container>
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Opis produktu</th>
            <td mat-cell *matCellDef="let review">{{ review.description }}</td>
          </ng-container>
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Cena produktu</th>
            <td mat-cell *matCellDef="let review">{{ review.price }}</td>
          </ng-container>
          <ng-container matColumnDef="download" stickyEnd>
            <th mat-header-cell *matHeaderCellDef>Pobierz .txt</th>
            <td mat-cell *matCellDef="let row">
              <a mat-button (click)="downloadTxt(row)">Download</a>
            </td>
          </ng-container>
          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
        </mat-table>
      </div>
    </div>
  `,
  styleUrls: ["./output.component.scss"]
})
export class OutputComponent {
  @Input() isStarted = false;
  @Input() etlStats: string;
  @Input() etlData: Review[];
  @Input() showWarning: boolean;
  @Input() isDone = false;

  displayedColumns: string[] = [
    "id",
    "username",
    "rating",
    "upvotes",
    "downvotes",
    "date",
    "reviewedAfter",
    "content",
    "bought",
    "productId",
    "prodName",
    "description",
    "price",
    "download"
  ];

  downloadTxt(review: Review) {
    let data =
      "Id recenzji: " +
      review.id.trim() +
      "\n" +
      "Nazwa użykownika: " +
      review.reviewerusername.trim() +
      "\n" +
      "Ocena: " +
      review.rating +
      "\n" +
      "Głosy za: " +
      review.upvotes +
      "\n" +
      "Głosy przeciw: " +
      review.downvotes +
      "\n" +
      "Data wystawienia: " +
      review.date.trim() +
      "\n" +
      "Oceniono po dniach: " +
      review.reviewedafter.trim() +
      "\n" +
      "Treść opinii: " +
      review.content.trim() +
      "\n" +
      "Czy recenzujący kupił produkt: " +
      review.reviewerboughtproduct +
      "\n" +
      "Id produktu: " +
      review.productid.trim() +
      "\n" +
      "Nazwa produktu: " +
      review.name.trim() +
      "\n" +
      "Opis produktu: " +
      review.description.trim() +
      "\n" +
      "Cena produktu: " +
      review.price +
      "\n";
    let blob = new Blob(["\ufeff" + data], { type: "text/plain" });
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = review.id + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
