import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersLabelsRoutingModule } from './filters-labels-routing.module';
import { FiltersLabelsComponent } from './filters-labels.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FiltersLabelsComponent
  ],
  imports: [
    CommonModule,
    FiltersLabelsRoutingModule,
    SharedModule
  ]
})
export class FiltersLabelsModule { } 