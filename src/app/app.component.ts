import { Component } from "@angular/core";
import { Review } from "./review-service/review.service";

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <div class="content-container mat-elevation-z1">
      <app-controls
        (isStarted)="isStarted = $event"
        (etlStats)="etlStats = $event"
        (etlData)="etlData = $event"
        (showWarning)="showWarning = $event"
        (isDone)="isDone = $event"
      ></app-controls>
      <app-output
        [isStarted]="isStarted"
        [etlStats]="etlStats"
        [etlData]="etlData"
        [showWarning]="showWarning"
        [isDone]="isDone"
      ></app-output>
      <router-outlet></router-outlet>
      <div>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isStarted: boolean;
  etlStats: number;
  etlData: Review[];
  showWarning: boolean;
  isDone: boolean;
}
