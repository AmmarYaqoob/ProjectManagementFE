import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faBox, faStar, faRocket, faProjectDiagram, faFilter, faUserFriends, faBullseye, faTh, faCog, faSignOutAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen$!: Observable<boolean>;
  faCog = faCog;

  faTachometerAlt = faTachometerAlt;
  faProjectDiagram = faProjectDiagram;
  faTasks = faTasks;
  faUserFriends = faUserFriends;
  faSignOutAlt = faSignOutAlt;

  menuItems = [
    { name: 'Dashboard', icon: faTachometerAlt, link: '/dashboard' },
    { name: 'All Projects', icon: faProjectDiagram, link: '/projects' },
    { name: 'Starred', icon: faTasks, link: '/starred' },
    { name: 'Recent', icon: faUserFriends, link: '/recent' },
    { name: 'Filters & Labels', icon: faCog, link: '/filters-labels' },
    { name: 'Team', icon: faUserFriends, link: '/team' },
    { name: 'Goals', icon: faSignOutAlt, link: '/goals' },
  ];

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.isSidebarOpen$ = this.layoutService.sidebarOpen$;
  }
} 