import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls',
  template: `
    <mat-toolbar color="primary" class='mat-elevation-z1'>
      <div class='controls-container'>
        <mat-card></mat-card>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
