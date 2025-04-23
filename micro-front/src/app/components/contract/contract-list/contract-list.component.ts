import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../../../models/contract.model';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  contracts: Contract[] = [];
  loading = false;
  error = '';

  constructor(
    private contractService: ContractService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.loading = true;
    this.contractService.getAllContracts().subscribe({
      next: (data) => {
        this.contracts = data;
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load contracts. Please try again later.';
        console.error(e);
        this.loading = false;
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/contracts', id]);
  }

  editContract(id: number): void {
    this.router.navigate(['/contracts/edit', id]);
  }

  deleteContract(id: number): void {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contractService.deleteContract(id).subscribe({
        next: () => {
          this.loadContracts();
        },
        error: (e) => {
          this.error = 'Failed to delete contract. Please try again later.';
          console.error(e);
        }
      });
    }
  }

  createContract(): void {
    this.router.navigate(['/contracts/new']);
  }
}
