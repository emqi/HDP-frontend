import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ReviewService, Review } from "../review-service/review.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-controls",
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z1">
      <div class="controls-container">
        <mat-card>
          <mat-card-title>Panel kontrolny</mat-card-title>
          <mat-card-content>
            <div class="input-container">
              <input
                matInput
                placeholder="Szukana fraza"
                type="search"
                [disabled]="isProcessing"
              />
            </div>
            <div class="buttons-container">
              <button
                mat-stroked-button
                color="primary"
                class="top-row"
                (click)="onFullProcessClick()"
                [disabled]="isProcessing"
              >
                Kompletny proces ETL
              </button>
              <button
                mat-stroked-button
                color="primary"
                class="bottom-row-extract"
                [disabled]="isProcessing"
              >
                Extract
              </button>
              <button
                mat-stroked-button
                color="primary"
                class="bottom-row-transfer"
                [disabled]="isProcessing"
              >
                Transform
              </button>
              <button
                mat-stroked-button
                color="primary"
                class="bottom-row-load"
                [disabled]="isProcessing"
              >
                Load
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ["./controls.component.scss"]
})
export class ControlsComponent {
  @Output() clicked = new EventEmitter<boolean>();
  @Output() etlStats = new EventEmitter<number>();
  @Output() etlData = new EventEmitter<Review[]>();

  isProcessing = false;
  isInputDisabled = false;
  isFullProcessDisabled = false;
  isExtractDisabled = false;
  isTransformDisabled = true;
  isLoadDisabled = true;

  stats: number;
  result: Review[];

  constructor(private reviewService: ReviewService) {}

  async onFullProcessClick() {
    this.isProcessing = true;
    this.clicked.emit(true);
    this.stats = await this.reviewService.startETL('rower').toPromise();
    console.log(this.stats);
    this.etlStats.emit(this.stats);
    this.result = await this.reviewService.getReviews("rower").toPromise();
    console.log(this.result);
    this.etlData.emit(this.result);
    // this.result.subscribe(value => {
    //   this.etlData.emit(value);
    //   this.isProcessing = false;
    // });
  }
}
