import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formation!: Formation;
  loading = false;
  error = '';
  formationId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.formationId = +this.route.snapshot.params['id'];
    this.loadFormation();
  }

  loadFormation(): void {
    this.loading = true;
    this.formationService.getFormationById(this.formationId).subscribe({
      next: (data) => {
        this.formation = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load formation details. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  editFormation(): void {
    this.router.navigate(['/formations/edit', this.formationId]);
  }

  deleteFormation(): void {
    if (confirm('Are you sure you want to delete this formation?')) {
      this.formationService.deleteFormation(this.formationId).subscribe({
        next: () => {
          this.router.navigate(['/formations']);
        },
        error: (e) => {
          this.error = 'Failed to delete formation. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/formations']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'DISPONIBLE':
        return 'bg-success';
      case 'NONCOMMENCE':
        return 'bg-warning';
      case 'ENCOURS':
        return 'bg-primary';
      case 'TERMINE':
        return 'bg-secondary';
      default:
        return 'bg-info';
    }
  }
}
