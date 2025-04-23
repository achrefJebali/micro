import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation.service';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {
  formations: Formation[] = [];
  loading = false;
  error = '';

  constructor(
    private formationService: FormationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.loading = true;
    this.formationService.getAllFormations().subscribe({
      next: (data) => {
        this.formations = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load formations. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/formations', id]);
  }

  editFormation(id: number): void {
    this.router.navigate(['/formations/edit', id]);
  }

  deleteFormation(id: number): void {
    if (confirm('Are you sure you want to delete this formation?')) {
      this.formationService.deleteFormation(id).subscribe({
        next: () => {
          this.loadFormations();
        },
        error: (e) => {
          this.error = 'Failed to delete formation. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  createFormation(): void {
    this.router.navigate(['/formations/new']);
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
