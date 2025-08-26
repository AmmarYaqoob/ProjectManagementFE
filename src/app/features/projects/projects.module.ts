import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AllProjectsComponent } from './all-projects.component';
import { ProjectDetailComponent } from './project-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AllProjectsComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { } 