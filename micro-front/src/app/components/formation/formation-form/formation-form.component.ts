import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation, Statut } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation.service';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.scss']
})
export class FormationFormComponent implements OnInit {
  formationForm: FormGroup;
  isEditMode = false;
  formationId!: number;
  loading = false;
  submitted = false;
  error = '';
  statuses = Object.values(Statut);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationService
  ) {
    this.formationForm = this.formBuilder.group({
      nomFormation: ['', Validators.required],
      description: ['', Validators.required],
      dateFormation: ['', Validators.required],
      nombrePlace: [0, [Validators.required, Validators.min(0)]],
      statut: [Statut.DISPONIBLE, Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.formationId = +this.route.snapshot.params['id'];
    this.isEditMode = !!this.formationId;

    if (this.isEditMode) {
      this.loading = true;
      this.formationService.getFormationById(this.formationId).subscribe({
        next: (formation) => {
          this.formationForm.patchValue({
            nomFormation: formation.nomFormation,
            description: formation.description,
            dateFormation: this.formatDate(formation.dateFormation),
            nombrePlace: formation.nombrePlace,
            statut: formation.statut,
            prix: formation.prix
          });
          this.loading = false;
        },
        error: (e) => {
          this.error = 'Failed to load formation data. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  // Helper to format dates for form input
  private formatDate(date: any): string {
    if (!date) return '';
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toISOString().substring(0, 10);
  }

  get f() { return this.formationForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.formationForm.invalid) {
      return;
    }

    this.loading = true;
    const formation: Formation = {
      ...this.formationForm.value,
      dateFormation: new Date(this.formationForm.value.dateFormation)
    };

    if (this.isEditMode) {
      this.formationService.updateFormation(this.formationId, formation).subscribe({
        next: () => {
          this.router.navigate(['/formations']);
        },
        error: (e) => {
          this.error = 'Failed to update formation. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    } else {
      this.formationService.createFormation(formation).subscribe({
        next: () => {
          this.router.navigate(['/formations']);
        },
        error: (e) => {
          this.error = 'Failed to create formation. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/formations']);
  }
}
