import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule
} from "@angular/material";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  exports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule]
})
export class MaterialModule {}
