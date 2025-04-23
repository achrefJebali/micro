import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract, Specialite } from '../../../models/contract.model';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {
  contractForm: FormGroup;
  isEditMode = false;
  contractId!: number;
  loading = false;
  submitted = false;
  error = '';
  specialities = Object.values(Specialite);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService
  ) {
    this.contractForm = this.formBuilder.group({
      nom: ['', Validators.required],
      dateDebutContrat: ['', Validators.required],
      dateFinContrat: ['', Validators.required],
      specialite: [Specialite.WEB, Validators.required],
      montantContrat: [0, [Validators.required, Validators.min(0)]],
      archive: [false]
    });
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params['id'];
    this.isEditMode = !!this.contractId;

    if (this.isEditMode) {
      this.loading = true;
      this.contractService.getContractById(this.contractId).subscribe({
        next: (contract) => {
          this.contractForm.patchValue({
            nom: contract.nom,
            dateDebutContrat: this.formatDate(contract.dateDebutContrat),
            dateFinContrat: this.formatDate(contract.dateFinContrat),
            specialite: contract.specialite,
            montantContrat: contract.montantContrat,
            archive: contract.archive
          });
          this.loading = false;
        },
        error: (e) => {
          this.error = 'Failed to load contract data. Please try again.';
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

  get f() { return this.contractForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.contractForm.invalid) {
      return;
    }

    this.loading = true;
    const contract: Contract = {
      ...this.contractForm.value,
      dateDebutContrat: new Date(this.contractForm.value.dateDebutContrat),
      dateFinContrat: new Date(this.contractForm.value.dateFinContrat)
    };

    if (this.isEditMode) {
      this.contractService.updateContract(this.contractId, contract).subscribe({
        next: () => {
          this.router.navigate(['/contracts']);
        },
        error: (e) => {
          this.error = 'Failed to update contract. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    } else {
      this.contractService.createContract(contract).subscribe({
        next: () => {
          this.router.navigate(['/contracts']);
        },
        error: (e) => {
          this.error = 'Failed to create contract. Please try again.';
          console.error(e);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/contracts']);
  }
}
