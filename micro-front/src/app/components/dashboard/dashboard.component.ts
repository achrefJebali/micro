import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  serviceStatuses = [
    { name: 'Departments', status: 'Online', count: 0, icon: 'business' },
    { name: 'Contracts', status: 'Online', count: 0, icon: 'description' },
    { name: 'Teams', status: 'Online', count: 0, icon: 'people' },
    { name: 'Formations', status: 'Online', count: 0, icon: 'school' },
    { name: 'Resources', status: 'Online', count: 0, icon: 'folder' },
    { name: 'Universities', status: 'Online', count: 0, icon: 'account_balance' },
    { name: 'Node Service', status: 'Online', count: 0, icon: 'code' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Here you would fetch real data and status from your services
  }
}
