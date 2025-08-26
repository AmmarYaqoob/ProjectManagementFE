import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersLabelsComponent } from './filters-labels.component';
import { MainLayoutComponent } from '../../shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: FiltersLabelsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltersLabelsRoutingModule { } 