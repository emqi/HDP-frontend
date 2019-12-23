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
export class ProgressBarComponent implements AfterViewInit {
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log(window.pageYOffset);
    if (!this. header.classList.contains('sticky') && window.pageYOffset > this.header.offsetTop - 64) {
      this.header.classList.add("sticky");
    } else if (window.pageYOffset < 245) {
      this.header.classList.remove("sticky");
    }
  }

  header: HTMLElement;
  sticky: number;

  ngAfterViewInit() {
    this.header = document.getElementById("progressContainer");
  }
}
