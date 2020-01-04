import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Review } from "src/app/review-service/review.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
  selector: "app-data-table-component",
  template: `
    <div class="input-filter">
      <mat-form-field floatLabel="always" class="input-form">
        <input
          matInput
          type="text"
          (keyup)="filter($event.target.value)"
          placeholder="Filtruj:"
        />
      </mat-form-field>
    </div>
    <mat-table
      class="lessons-table mat-elevation-z8"
      [dataSource]="dataSource"
      matSort
    >
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Id recencji
        </th>
        <td mat-cell *matCellDef="let review">{{ review.id }}</td>
      </ng-container>
      <ng-container matColumnDef="reviewerusername">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Nazwa użytkownika
        </th>
        <td mat-cell *matCellDef="let review">
          {{ review.reviewerusername }}
        </td>
      </ng-container>
      <ng-container matColumnDef="rating">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Ocena</th>
        <td mat-cell *matCellDef="let review">{{ review.rating }}</td>
      </ng-container>
      <ng-container matColumnDef="upvotes">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Głosy "za"
        </th>
        <td mat-cell *matCellDef="let review">{{ review.upvotes }}</td>
      </ng-container>
      <ng-container matColumnDef="downvotes">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Głosy "przeciw"
        </th>
        <td mat-cell *matCellDef="let review">{{ review.downvotes }}</td>
      </ng-container>
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Data wystawienia
        </th>
        <td mat-cell *matCellDef="let review">{{ review.date | date }}</td>
      </ng-container>
      <ng-container matColumnDef="reviewedAfter">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Oceniono po dniach
        </th>
        <td mat-cell *matCellDef="let review">
          {{ review.reviewedafter }}
        </td>
      </ng-container>
      <ng-container matColumnDef="content">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Treść opini
        </th>
        <td mat-cell *matCellDef="let review">{{ review.content }}</td>
      </ng-container>
      <ng-container matColumnDef="reviewerboughtproduct">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Czy recenzujący kupił produkt
        </th>
        <td mat-cell *matCellDef="let review">
          {{ review.reviewerboughtproduct }}
        </td>
      </ng-container>
      <ng-container matColumnDef="productid">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Id produktu
        </th>
        <td mat-cell *matCellDef="let review">{{ review.productid }}</td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Nazwa produktu
        </th>
        <td mat-cell *matCellDef="let review">{{ review.name }}</td>
      </ng-container>
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Opis produktu
        </th>
        <td mat-cell *matCellDef="let review">{{ review.description }}</td>
      </ng-container>
      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>
          Cena produktu
        </th>
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
    <mat-paginator
      [length]="etlData?.length"
      [pageSize]="50"
      [pageSizeOptions]="[10, 20, 50, 100, 500]"
    ></mat-paginator>
  `,
  styleUrls: ["./data-table-component.component.scss"]
})
export class DataTableComponentComponent {
  @Input() etlData: Review[];

  dataSource: MatTableDataSource<Review>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.etlData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "id",
    "reviewerusername",
    "rating",
    "upvotes",
    "downvotes",
    "date",
    "reviewedAfter",
    "content",
    "reviewerboughtproduct",
    "productid",
    "name",
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
      (review.reviewedafter ? review.reviewedafter.trim() : "B/D") +
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

  filter(value: string){
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
