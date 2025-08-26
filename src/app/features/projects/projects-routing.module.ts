import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects.component';
import { ProjectDetailComponent } from './project-detail.component';

const routes: Routes = [
  { path: '', component: AllProjectsComponent },
  { path: ':id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { } 