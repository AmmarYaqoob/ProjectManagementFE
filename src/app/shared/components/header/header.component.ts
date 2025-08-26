import { Component, OnInit } from '@angular/core';
import { faBars, faBell, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faBars = faBars;
  faBell = faBell;
  faCog = faCog;
  faUserCircle = faUserCircle;

  showNotificationMenu = false;
  showSettingsMenu = false;
  showUserMenu = false;

  notificationCount = 5; // Example count

  constructor(private layoutService: LayoutService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 