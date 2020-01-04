import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit
} from "@angular/core";
import {
  ReviewService,
  Review,
  Statistics
} from "../review-service/review.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-controls",
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z1">
      <div class="controls-container">
        <mat-card>
          <mat-card-title>Panel kontrolny</mat-card-title>
          <mat-card-content>
            <div class="input-container">
              <mat-form-field floatLabel="always">
                <input
                  id="input"
                  #input
                  matInput
                  placeholder="Szukany produkt:"
                  type="search"
                  [disabled]="isProcessing"
                />
              </mat-form-field>
              <mat-form-field class="pages-input" floatLabel="always">
                <input
                  id="pagesInput"
                  #pagesInput
                  matInput
                  value="1"
                  max="999"
                  min="1"
                  type="number"
                  [formControl]="control"
                  [disableControl]="isProcessing"
                  placeholder="Stron:"
                />
              </mat-form-field>
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
                (click)="onExtractClick()"
                [disabled]="isProcessing"
              >
                Extract
              </button>
              <button
                mat-stroked-button
                color="primary"
                class="bottom-row-transfer"
                (click)="onTransformClick()"
                [disabled]="isProcessing || isTransformDisabled"
              >
                Transform
              </button>
              <button
                mat-stroked-button
                color="primary"
                class="bottom-row-load"
                (click)="onLoadClick()"
                [disabled]="isProcessing || isLoadDisabled"
              >
                Load
              </button>
            </div>
            <div class="request-buttons-container">
              <button mat-raised-button color="primary" (click)="downloadCSV()">
                <i class="material-icons download-csv">cloud_download</i>
                <div>Pobierz .CSV</div>
              </button>
              <button mat-raised-button color="primary" (click)="clearDb()">
                <i class="material-icons clear-database">clear</i>
                <div>Wyczyść bazę</div>
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ["./controls.component.scss"]
})
export class ControlsComponent implements OnInit {
  @Output() isStarted = new EventEmitter<boolean>();
  @Output() etlStats = new EventEmitter<string>();
  @Output() etlData = new EventEmitter<Review[]>();
  @Output() showWarning = new EventEmitter<boolean>();
  @Output() isDone = new EventEmitter<boolean>();

  @ViewChild("input", { static: false }) input: ElementRef;
  @ViewChild("pagesInput", { static: false }) pagesInput: ElementRef;

  isProcessing = false;
  isInputDisabled = false;
  isTransformDisabled = true;
  isLoadDisabled = true;

  stats: Statistics;
  result: Review[];
  inputComponent: HTMLElement;

  control = new FormControl(0, [Validators.min(1), Validators.max(999)]);

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      if (value > 999) {
        this.control.setValue(999, { emitEvent: false });
      }
      if (value < 0) {
        this.control.setValue(1, { emitEvent: false });
      }
      if (value == 0) {
        this.control.setValue(1, { emitEvent: false });
      }
    });
    setTimeout(() => {
      document.getElementById('input').click();
    }, 0);
  }

  async onFullProcessClick() {
    this.cleanOutput();
    if (this.input.nativeElement.value && this.pagesInput.nativeElement.value) {
      const value = this.input.nativeElement.value as string;
      const pages = this.pagesInput.nativeElement.value as number;
      this.isProcessing = true;
      this.isStarted.emit(true);
      this.stats = await this.reviewService.startETL(value, pages).toPromise();
      this.etlStats.emit(
        "Proces ETL zakończony. Do bazy zaladowano: " +
          this.stats.reviews +
          " nowych opinii dotyczących " +
          this.stats.products +
          " znalezionych produktów."
      );
      this.result = await this.reviewService.getReviews().toPromise();
      this.etlData.emit(this.result);
      this.isDone.emit(true);
      this.isProcessing = false;
      this.isTransformDisabled = true;
      this.isLoadDisabled = true;
    } else {
      this.showWarning.emit(true);
    }
  }

  async onExtractClick() {
    this.cleanOutput();
    if (this.input.nativeElement.value && this.pagesInput.nativeElement.value) {
      const value = this.input.nativeElement.value as string;
      const pages = this.pagesInput.nativeElement.value as number;
      this.isProcessing = true;
      this.isStarted.emit(true);
      this.stats = await this.reviewService
        .startExtract(value, pages)
        .toPromise();
      this.etlStats.emit(
        "Pobrano " +
          this.stats.reviews +
          " opinii, dotyczących " +
          this.stats.products +
          " znalezionych produktów."
      );
      this.isDone.emit(true);
      this.isProcessing = false;
      this.isTransformDisabled = false;
      this.isLoadDisabled = true;
    } else {
      this.showWarning.emit(true);
    }
  }

  async onTransformClick() {
    this.cleanOutput();
    this.isProcessing = true;
    this.isStarted.emit(true);
    this.stats = await this.reviewService.startTransform().toPromise();
    this.etlStats.emit("Przetransformowano " + this.stats.reviews + " opinii.");
    this.isDone.emit(true);
    this.isProcessing = false;
    this.isTransformDisabled = true;
    this.isLoadDisabled = false;
  }

  async onLoadClick() {
    this.cleanOutput();
    this.isProcessing = true;
    this.isStarted.emit(true);
    this.stats = await this.reviewService.startLoad().toPromise();
    this.etlStats.emit(
      "Do bazy zaladowano: " +
        this.stats.reviews +
        " nowych opinii dotyczących " +
        this.stats.products +
        " znalezionych produktów."
    );
    this.result = await this.reviewService.getReviews().toPromise();
    this.etlData.emit(this.result);
    this.isDone.emit(true);
    this.isProcessing = false;
    this.isTransformDisabled = true;
    this.isLoadDisabled = true;
  }

  cleanOutput() {
    this.isStarted.emit(false);
    this.etlStats.emit(null);
    this.etlData.emit(null);
    this.isDone.emit(false);
  }

  downloadCSV() {
    this.reviewService.downloadCSV();
  }

  clearDb() {
    this.reviewService.clearDatabase().toPromise();
  }
}
