import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [MatToolbarModule, MatButtonModule, MatIconModule]
})
export class MaterialModule {}
