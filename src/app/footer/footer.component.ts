import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <mat-toolbar color="primary" class='mat-elevation-z6'>
      <span class='copyright'>Copyright @ 2019-2020 Marcin Skrzekut, Sebastian Rajca, Bartosz Porębski</span>
    </mat-toolbar>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
