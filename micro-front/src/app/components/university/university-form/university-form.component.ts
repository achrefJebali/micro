import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { University } from '../../../models/university.model';
import { UniversityService } from '../../../services/university.service';

@Component({
  selector: 'app-university-form',
  templateUrl: './university-form.component.html',
  styleUrls: ['./university-form.component.scss']
})
export class UniversityFormComponent implements OnInit {
  universityForm: FormGroup;
  isEditMode = false;
  universityId!: number;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private universityService: UniversityService
  ) {
    this.universityForm = this.formBuilder.group({
      nomUniv: ['', Validators.required],
      latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  ngOnInit(): void {
    this.universityId = +this.route.snapshot.params['id'];
    this.isEditMode = !!this.universityId;

    if (this.isEditMode) {
      this.loading = true;
      this.universityService.getUniversityById(this.universityId).subscribe({
        next: (university) => {
          this.universityForm.patchValue({
            nomUniv: university.nomUniv,
            latitude: university.latitude,
            longitude: university.longitude
          });
          this.loading = false;
        },
        error: (e) => {
          this.error = 'Failed to load university data. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  get f() { return this.universityForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.universityForm.invalid) {
      return;
    }

    this.loading = true;
    const university: University = this.universityForm.value;

    if (this.isEditMode) {
      this.universityService.updateUniversity(this.universityId, university).subscribe({
        next: () => {
          this.router.navigate(['/universities']);
        },
        error: (e) => {
          this.error = 'Failed to update university. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    } else {
      this.universityService.createUniversity(university).subscribe({
        next: () => {
          this.router.navigate(['/universities']);
        },
        error: (e) => {
          this.error = 'Failed to create university. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/universities']);
  }
}
