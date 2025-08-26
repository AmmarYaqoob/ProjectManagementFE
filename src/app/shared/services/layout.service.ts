import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private sidebarOpen = new BehaviorSubject<boolean>(true);
  sidebarOpen$ = this.sidebarOpen.asObservable();

  toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }
} 