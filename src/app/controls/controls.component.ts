import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-controls",
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z1">
      <div class="controls-container">
        <mat-card>
          <mat-card-title>Panel kontrolny</mat-card-title>
          <mat-card-content>
            <div class='input-container'>
              <input matInput placeholder="Szukana fraza" type="search"/>
            </div>
            <div class="buttons-container">
              <button mat-stroked-button color="primary" class="top-row">
                Kompletny proces ETL
              </button>
              <button mat-stroked-button color="primary" class="bottom-row-extract">Extract</button>
              <button mat-stroked-button color="primary" class="bottom-row-transfer">Transform</button>
              <button mat-stroked-button color="primary" class="bottom-row-load">Load</button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ["./controls.component.scss"]
})
export class ControlsComponent {}
