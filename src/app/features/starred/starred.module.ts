import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarredRoutingModule } from './starred-routing.module';
import { StarredComponent } from './starred.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    StarredComponent
  ],
  imports: [
    CommonModule,
    StarredRoutingModule,
    SharedModule
  ]
})
export class StarredModule { } 