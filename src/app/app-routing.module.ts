import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'starred',
        loadChildren: () => import('./features/starred/starred.module').then(m => m.StarredModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule)
      },
      {
        path: 'recent',
        loadChildren: () => import('./features/recent/recent.module').then(m => m.RecentModule)
      },
      {
        path: 'filters-labels',
        loadChildren: () => import('./features/filters-labels/filters-labels.module').then(m => m.FiltersLabelsModule)
      },
      {
        path: 'goals',
        loadChildren: () => import('./features/goals/goals.module').then(m => m.GoalsModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 