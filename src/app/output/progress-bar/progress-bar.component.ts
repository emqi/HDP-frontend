import { Component, OnInit, AfterViewInit, HostListener } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  template: `
    <div class="progress-container" id='progressContainer'>
      <span>Przetwarzanie...</span>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
  `,
  styleUrls: ["./progress-bar.component.scss"]
})
export class ProgressBarComponent {}
