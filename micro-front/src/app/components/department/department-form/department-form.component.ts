import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  isEditMode = false;
  departmentId!: number;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.formBuilder.group({
      nomDepart: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      active: [true],
      createdDate: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.params['id'];
    this.isEditMode = !!this.departmentId;

    if (this.isEditMode) {
      this.loading = true;
      this.departmentService.getDepartmentById(this.departmentId).subscribe({
        next: (department) => {
          this.departmentForm.patchValue({
            nomDepart: department.nomDepart,
            description: department.description,
            code: department.code,
            email: department.email,
            phone: department.phone,
            active: department.active,
            createdDate: new Date(department.createdDate)
          });
          this.loading = false;
        },
        error: (e) => {
          this.error = 'Failed to load department data. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  get f() { return this.departmentForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.departmentForm.invalid) {
      return;
    }

    this.loading = true;
    const department: Department = this.departmentForm.value;

    if (this.isEditMode) {
      this.departmentService.updateDepartment(this.departmentId, department).subscribe({
        next: () => {
          this.router.navigate(['/departments']);
        },
        error: (e) => {
          this.error = 'Failed to update department. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    } else {
      this.departmentService.createDepartment(department).subscribe({
        next: () => {
          this.router.navigate(['/departments']);
        },
        error: (e) => {
          this.error = 'Failed to create department. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/departments']);
  }
}
