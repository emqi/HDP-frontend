import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ReviewService, Review } from "../review-service/review.service";

@Component({
  selector: "app-controls",
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z1">
      <div class="controls-container">
        <button (click)="test()">CSV</button>
        <mat-card>
          <mat-card-title>Panel kontrolny</mat-card-title>
          <mat-card-content>
            <div class="input-container">
              <input
                id="input"
                #input
                matInput
                placeholder="Szukany produkt"
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
          </mat-card-content>
        </mat-card>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ["./controls.component.scss"]
})
export class ControlsComponent {
  @Output() isStarted = new EventEmitter<boolean>();
  @Output() etlStats = new EventEmitter<string>();
  @Output() etlData = new EventEmitter<Review[]>();
  @Output() showWarning = new EventEmitter<boolean>();
  @Output() isDone = new EventEmitter<boolean>();

  @ViewChild("input", { static: false }) input: ElementRef;

  isProcessing = false;
  isInputDisabled = false;
  isTransformDisabled = true;
  isLoadDisabled = true;

  stats: number;
  result: Review[];
  inputComponent: HTMLElement;

  constructor(private reviewService: ReviewService) {}

  async onFullProcessClick() {
    this.cleanOutput();
    if (this.input.nativeElement.value) {
      const value = this.input.nativeElement.value as string;
      this.isProcessing = true;
      this.isStarted.emit(true);
      this.stats = await this.reviewService.startETL(value).toPromise();
      this.etlStats.emit('Proces ETL zakończony. Do bazy zaladowano: ' + this.stats + ' rekordów.');
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
    if (this.input.nativeElement.value) {
      const value = this.input.nativeElement.value as string;
      this.isProcessing = true;
      this.isStarted.emit(true);
      this.stats = await this.reviewService.startExtract(value).toPromise();
      this.etlStats.emit('Pobrano ' + this.stats + 'opinii.');
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
    this.etlStats.emit('Przetransformowano ' + this.stats + ' rekordów.');
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
    this.etlStats.emit('Do bazy załadowano ' + this.stats + ' rekordów.');
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

  test() {
    this.reviewService.downloadCSV();
  }

  // testStats = 123;
  // testReviews: Review[] = [
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   },
  //   {
  //     id: "76441367",
  //     reviewerusername: "sulks",
  //     rating: 4,
  //     upvotes: 0,
  //     downvotes: 0,
  //     date: "2019-07-01T22:00:00.000Z",
  //     reviewedafter: "2655012000",
  //     content:
  //       "Naprawdę warte polecenia urządzenie. Zdjęcia z wakacji fantastyczne.",
  //     reviewerboughtproduct: true,
  //     productid: "76441367",
  //     name: " Samsung Galaxy S10 Plus SM-G975 128GB Prism White",
  //     description:
  //       "Smartfon z ekranem 6,4 cala. Aparat 16 Mpix, pamięć 8 GB RAM\n\t\t",
  //     price: 3038
  //   }
  // ];
}
