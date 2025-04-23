import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../../../models/team.model';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  loading = false;
  error = '';

  constructor(
    private teamService: TeamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.loading = true;
    this.teamService.getAllTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load teams. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/teams', id]);
  }

  editTeam(id: number): void {
    this.router.navigate(['/teams/edit', id]);
  }

  deleteTeam(id: number): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(id).subscribe({
        next: () => {
          this.loadTeams();
        },
        error: (e) => {
          this.error = 'Failed to delete team. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  createTeam(): void {
    this.router.navigate(['/teams/new']);
  }
}
