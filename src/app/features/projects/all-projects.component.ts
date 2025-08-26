import { Component } from '@angular/core';
import { faPlus, faSearch, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

interface Project {
  id: string;
  name: string;
  description: string;
  key: string;
  owner: string;
  status: 'active' | 'archived' | 'completed';
  progress: number;
  team: string[];
  lastUpdated: string;
}

@Component({
  standalone: false,
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent {
  // FontAwesome icons
  faPlus = faPlus;
  faSearch = faSearch;
  faFolderOpen = faFolderOpen;
  
  projects: Project[] = [
    {
      id: '1',
      name: 'Project Alpha',
      description: 'A comprehensive project management system for modern teams',
      key: 'ALPHA',
      owner: 'John Doe',
      status: 'active',
      progress: 75,
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      description: 'Modern e-commerce solution with advanced features',
      key: 'ECOMM',
      owner: 'Jane Smith',
      status: 'active',
      progress: 45,
      team: ['Jane Smith', 'Sarah Wilson', 'Tom Brown'],
      lastUpdated: '1 day ago'
    },
    {
      id: '3',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android',
      key: 'MOBILE',
      owner: 'Mike Johnson',
      status: 'active',
      progress: 90,
      team: ['Mike Johnson', 'Alex Chen', 'Lisa Wang'],
      lastUpdated: '3 days ago'
    },
    {
      id: '4',
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics and reporting dashboard',
      key: 'ANALYTICS',
      owner: 'Sarah Wilson',
      status: 'completed',
      progress: 100,
      team: ['Sarah Wilson', 'David Kim', 'Emma Davis'],
      lastUpdated: '1 week ago'
    },
    {
      id: '5',
      name: 'API Gateway',
      description: 'Microservices API gateway and management system',
      key: 'GATEWAY',
      owner: 'Tom Brown',
      status: 'active',
      progress: 30,
      team: ['Tom Brown', 'Chris Lee', 'Maria Garcia'],
      lastUpdated: '2 days ago'
    },
    {
      id: '6',
      name: 'Legacy System Migration',
      description: 'Migration of legacy systems to modern architecture',
      key: 'MIGRATION',
      owner: 'Alex Chen',
      status: 'archived',
      progress: 60,
      team: ['Alex Chen', 'Robert Taylor', 'Jennifer White'],
      lastUpdated: '2 weeks ago'
    }
  ];

  getStatusColor(status: string): string {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'archived': 'bg-gray-100 text-gray-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || colors.active;
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  getInitials(name: string): string {
    return name.charAt(0);
  }
} 