import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <div class='content-container mat-elevation-z1'>
      <app-controls></app-controls>
      <router-outlet></router-outlet>
    <div>
    <app-footer></app-footer>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {}
