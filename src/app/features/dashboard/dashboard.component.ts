import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // FontAwesome icons
  faPlus = faPlus;
  
  recentProjects = [
    { id: '1', name: 'Project Alpha', updated: '2 hours ago', owner: 'John Doe', color: 'bg-blue-500' },
    { id: '2', name: 'Project Beta', updated: 'Yesterday', owner: 'Jane Smith', color: 'bg-red-500' },
    { id: '3', name: 'Project Gamma', updated: '3 days ago', owner: 'Peter Jones', color: 'bg-green-500' },
    { id: '4', name: 'Project Delta', updated: 'Last week', owner: 'Sarah Miller', color: 'bg-yellow-500' }
  ];

  tabs = ['Your projects', 'Recently viewed', 'Urgents', 'Starred'];
  activeTab = this.tabs[0];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
