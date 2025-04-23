import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from '../../../models/contract.model';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  get contractDurationMonths(): number | null {
    if (this.contract?.dateDebutContrat && this.contract?.dateFinContrat) {
      const start = new Date(this.contract.dateDebutContrat).getTime();
      const end = new Date(this.contract.dateFinContrat).getTime();
      return (end - start) / (1000 * 60 * 60 * 24 * 30);
    }
    return null;
  }
  contract!: Contract;
  loading = false;
  error = '';
  contractId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService
  ) { }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params['id'];
    this.loadContract();
  }

  loadContract(): void {
    this.loading = true;
    this.contractService.getContractById(this.contractId).subscribe({
      next: (data) => {
        this.contract = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load contract details. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  editContract(): void {
    this.router.navigate(['/contracts/edit', this.contractId]);
  }

  deleteContract(): void {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contractService.deleteContract(this.contractId).subscribe({
        next: () => {
          this.router.navigate(['/contracts']);
        },
        error: (e) => {
          this.error = 'Failed to delete contract. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/contracts']);
  }
}
