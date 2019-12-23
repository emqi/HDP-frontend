import { Component, OnInit, Input, HostListener } from "@angular/core";

@Component({
  selector: "app-output",
  template: `
    <div class="default-container" *ngIf="!isStarted">
      <span class="info"
        >Rozpocznij proces ETL lub jeden z jego pojedynczych kroków za pomoca
        przycisków powyżej.
      </span>
    </div>
    <div class="output-container" *ngIf="isStarted">
      <app-progress-bar></app-progress-bar>
      <div class="content-container">
      </div>
    </div>
  `,
  styleUrls: ["./output.component.scss"]
})
export class OutputComponent {
  @Input() isStarted = false;
}
