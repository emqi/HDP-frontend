import { Component, OnInit, Input, HostListener } from "@angular/core";
import { Review } from "../review-service/review.service";

@Component({
  selector: "app-output",
  template: `
    <div class="default-container" *ngIf="!isStarted">
      <span class="warning" *ngIf="showWarning">Podaj poszukiwany produkt.</span>
      <span class="info"
        >Rozpocznij proces ETL lub jeden z jego pojedynczych kroków za pomoca
        przycisków powyżej.
      </span>
    </div>
    <div class="output-container" *ngIf="isStarted">
      <app-progress-bar *ngIf="!isDone"></app-progress-bar>
      <div class="content-container">
        <mat-card class="stats" *ngIf="etlStats">Statystyki: {{ etlStats }}</mat-card>
        <mat-card *ngFor="let review of etlData">
          <span>Id recenzji: {{ review.id }}</span>
          <span>Nazwa użytkownika: {{ review.reviewerusername }}</span>
          <span>Ocena: {{ review.rating }}</span>
          <span>Liczba glosów na plus: {{ review.upvotes }}</span>
          <span>Liczba głosów na minus: {{ review.downvotes}}</span>
          <span>Data: {{ review.date }}</span>
          <span>Wystawiono po: {{ review.reviewedafter}}</span>
          <span>Treść: {{ review.content }}</span>
          <span>Czy recenzent kupił produkt: {{ review.reviewerboughtproduct }}</span>
          <span>Id produktu: {{ review.productid }}</span>
          <span>Nazwa produktu: {{ review.name }}</span>
          <span>Opis: {{ review.description }}</span>
          <span>Cena: {{ review.price }}</span>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ["./output.component.scss"]
})
export class OutputComponent {
  @Input() isStarted = false;
  @Input() etlStats: number;
  @Input() etlData: Review[];
  @Input() showWarning: boolean;
  @Input() isDone = false;
}
