import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource, Format, Type } from '../../../models/resource.model';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {
  resourceForm: FormGroup;
  isEditMode = false;
  resourceId!: number;
  loading = false;
  submitted = false;
  error = '';
  formats = Object.values(Format);
  types = Object.values(Type);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
  ) {
    this.resourceForm = this.formBuilder.group({
      titre: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      format: [Format.PDF, Validators.required],
      type: [Type.COURS, Validators.required]
    });
  }

  ngOnInit(): void {
    this.resourceId = +this.route.snapshot.params['id'];
    this.isEditMode = !!this.resourceId;

    if (this.isEditMode) {
      this.loading = true;
      this.resourceService.getResourceById(this.resourceId).subscribe({
        next: (resource) => {
          this.resourceForm.patchValue({
            titre: resource.titre,
            url: resource.url,
            format: resource.format,
            type: resource.type
          });
          this.loading = false;
        },
        error: (e) => {
          this.error = 'Failed to load resource data. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  get f() { return this.resourceForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.resourceForm.invalid) {
      return;
    }

    this.loading = true;
    const resource: Resource = this.resourceForm.value;

    if (this.isEditMode) {
      this.resourceService.updateResource(this.resourceId, resource).subscribe({
        next: () => {
          this.router.navigate(['/resources']);
        },
        error: (e) => {
          this.error = 'Failed to update resource. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    } else {
      this.resourceService.createResource(resource).subscribe({
        next: () => {
          this.router.navigate(['/resources']);
        },
        error: (e) => {
          this.error = 'Failed to create resource. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/resources']);
  }
}
