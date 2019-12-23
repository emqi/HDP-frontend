import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-header",
  template: `
    <mat-toolbar color="primary" class='mat-elevation-z6'>
      <div class="toolbar-container">
        <span class='title'
          >Proces ETL - projekt z przedmiotu Hurtownie Danych 2019/2020</span
        >
        <a
          href="https://github.com/cerbin1/data-scrapping"
          mat-flat-button
          color="primary"
        >
          <mat-icon svgIcon="github"></mat-icon>GitHub
        </a>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `github`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/github-circle-white-transparent.svg`
      )
    );
  }
}
