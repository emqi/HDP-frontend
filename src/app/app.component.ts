import { Component } from "@angular/core";
import { Review } from './review-service/review.service';

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <div class='content-container mat-elevation-z1'>
      <app-controls (clicked)="clicked = $event" (etlStats)="etlStats = $event" (etlData)="etlData = $event"></app-controls>
      <app-output [isStarted]="clicked" [etlStats]="etlStats" [etlData]="etlData"></app-output>
      <router-outlet></router-outlet>
    <div>
    <app-footer></app-footer>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  clicked: boolean;
  etlStats: number;
  etlData: Review[];
}
