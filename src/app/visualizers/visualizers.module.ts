import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BarVisualizerModule } from "../shared/bar-visualizer/bar-visualizer.module";
import { BubleSortComponent } from "./components/buble-sort/buble-sort.component";

@NgModule({
    declarations: [BubleSortComponent],
    imports: [
      CommonModule,
      BarVisualizerModule,
      RouterModule.forChild([{ path: '', component: BubleSortComponent }]),
    ],
  })
  export class VisualizerModule {}
  