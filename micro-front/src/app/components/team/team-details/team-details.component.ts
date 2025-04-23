import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../../models/team.model';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
  team!: Team;
  loading = false;
  error = '';
  teamId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.teamId = +this.route.snapshot.params['id'];
    this.loadTeam();
  }

  loadTeam(): void {
    this.loading = true;
    this.teamService.getTeamById(this.teamId).subscribe({
      next: (data) => {
        this.team = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load team details. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  editTeam(): void {
    this.router.navigate(['/teams/edit', this.teamId]);
  }

  deleteTeam(): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(this.teamId).subscribe({
        next: () => {
          this.router.navigate(['/teams']);
        },
        error: (e) => {
          this.error = 'Failed to delete team. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/teams']);
  }
}
