import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarredComponent } from './starred.component';
import { MainLayoutComponent } from '../../shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: StarredComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarredRoutingModule { } 