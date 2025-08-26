import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../services/layout.service';

@Component({
  standalone: false,
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen$!: Observable<boolean>;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.isSidebarOpen$ = this.layoutService.sidebarOpen$;
  }

} 