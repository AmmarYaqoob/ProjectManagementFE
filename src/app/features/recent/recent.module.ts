import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentRoutingModule } from './recent-routing.module';
import { RecentComponent } from './recent.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    RecentComponent
  ],
  imports: [
    CommonModule,
    RecentRoutingModule,
    SharedModule
  ]
})
export class RecentModule { } 