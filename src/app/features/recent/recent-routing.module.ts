import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentComponent } from './recent.component';
import { MainLayoutComponent } from '../../shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: RecentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentRoutingModule { } 