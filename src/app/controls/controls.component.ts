import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-controls",
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z1">
      <div class="controls-container">
        <mat-card>
          <mat-card-title>Panel kontrolny</mat-card-title>
          <mat-card-content>
            <div class='input-container'>
              <input matInput placeholder="Szukana fraza" type="search" [disabled]='isClicked'/>
            </div>
            <div class="buttons-container">
              <button mat-stroked-button color="primary" class="top-row" (click)="onClick()" [disabled]='isClicked'>
                Kompletny proces ETL
              </button>
              <button mat-stroked-button color="primary" class="bottom-row-extract" (click)="onClick()" [disabled]='isClicked'>Extract</button>
              <button mat-stroked-button color="primary" class="bottom-row-transfer" (click)="onClick()" [disabled]='isClicked'>Transform</button>
              <button mat-stroked-button color="primary" class="bottom-row-load" (click)="onClick()" [disabled]='isClicked'>Load</button>
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
  isClicked = false;

  onClick() {
    this.isClicked = !this.isClicked;
    this.clicked.emit(this.isClicked);
  }
}
