import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DragDropService } from './services/drag-drop.service';
import { TaskDetailModalComponent } from './components/task-detail-modal/task-detail-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MainLayoutComponent,
    TaskDetailModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    // Re-export these modules so they are available to any module that imports SharedModule
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,

    // Export the components so they can be used in other modules
    HeaderComponent,
    SidebarComponent,
    MainLayoutComponent,
    TaskDetailModalComponent
  ],
  providers: [
    DragDropService
  ]
})
export class SharedModule { } 