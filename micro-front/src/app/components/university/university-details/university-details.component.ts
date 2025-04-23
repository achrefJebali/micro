import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { University } from '../../../models/university.model';
import { UniversityService } from '../../../services/university.service';

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.scss']
})
export class UniversityDetailsComponent implements OnInit {
  university!: University;
  loading = false;
  error = '';
  universityId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private universityService: UniversityService
  ) { }

  ngOnInit(): void {
    this.universityId = +this.route.snapshot.params['id'];
    this.loadUniversity();
  }

  loadUniversity(): void {
    this.loading = true;
    this.universityService.getUniversityById(this.universityId).subscribe({
      next: (data) => {
        this.university = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load university details. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  editUniversity(): void {
    this.router.navigate(['/universities/edit', this.universityId]);
  }

  deleteUniversity(): void {
    if (confirm('Are you sure you want to delete this university?')) {
      this.universityService.deleteUniversity(this.universityId).subscribe({
        next: () => {
          this.router.navigate(['/universities']);
        },
        error: (e) => {
          this.error = 'Failed to delete university. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/universities']);
  }

  getMapUrl(): string {
    return `https://www.google.com/maps?q=${this.university.latitude},${this.university.longitude}`;
  }
}
