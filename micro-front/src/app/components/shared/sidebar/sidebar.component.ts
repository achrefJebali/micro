import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard' },
    { path: '/departments', title: 'Departments', icon: 'business' },
    { path: '/contracts', title: 'Contracts', icon: 'description' },
    { path: '/teams', title: 'Teams', icon: 'people' },
    { path: '/formations', title: 'Formations', icon: 'school' },
    { path: '/resources', title: 'Resources', icon: 'folder' },
    { path: '/universities', title: 'Universities', icon: 'account_balance' },
    { path: '/node-service', title: 'Node Service', icon: 'code' },
  ];
}
