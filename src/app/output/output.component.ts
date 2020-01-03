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
        <app-data-table-component *ngIf="etlData" [etlData]="etlData"></app-data-table-component>
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
}
