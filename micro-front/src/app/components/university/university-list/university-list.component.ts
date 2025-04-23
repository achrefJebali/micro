import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { University } from '../../../models/university.model';
import { UniversityService } from '../../../services/university.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})
export class UniversityListComponent implements OnInit {
  universities: University[] = [];
  loading = false;
  error = '';

  constructor(
    private universityService: UniversityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUniversities();
  }

  loadUniversities(): void {
    this.loading = true;
    this.universityService.getAllUniversities().subscribe({
      next: (data) => {
        this.universities = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load universities. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/universities', id]);
  }

  editUniversity(id: number): void {
    this.router.navigate(['/universities/edit', id]);
  }

  deleteUniversity(id: number): void {
    if (confirm('Are you sure you want to delete this university?')) {
      this.universityService.deleteUniversity(id).subscribe({
        next: () => {
          this.loadUniversities();
        },
        error: (e) => {
          this.error = 'Failed to delete university. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  createUniversity(): void {
    this.router.navigate(['/universities/new']);
  }

  getMapUrl(latitude: number, longitude: number): string {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
}
