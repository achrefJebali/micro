import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  loading = false;
  error = '';

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load departments. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/departments', id]);
  }

  editDepartment(id: number): void {
    this.router.navigate(['/departments/edit', id]);
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          this.loadDepartments();
        },
        error: (e) => {
          this.error = 'Failed to delete department. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  createDepartment(): void {
    this.router.navigate(['/departments/new']);
  }
}
