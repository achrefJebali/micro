import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  department!: Department;
  loading = false;
  error = '';
  departmentId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.params['id'];
    this.loadDepartment();
  }

  loadDepartment(): void {
    this.loading = true;
    this.departmentService.getDepartmentById(this.departmentId).subscribe({
      next: (data) => {
        this.department = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load department details. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  editDepartment(): void {
    this.router.navigate(['/departments/edit', this.departmentId]);
  }

  deleteDepartment(): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(this.departmentId).subscribe({
        next: () => {
          this.router.navigate(['/departments']);
        },
        error: (e) => {
          this.error = 'Failed to delete department. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/departments']);
  }
}
