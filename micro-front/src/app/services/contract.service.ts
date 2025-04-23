import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = 'http://localhost:8081/Contrat';

  constructor(private http: HttpClient) { }

  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.apiUrl}/contrats`);
  }

  getContractById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.apiUrl}/contrats/${id}`);
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.apiUrl}/contrats`, contract);
  }

  updateContract(id: number, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}/contrats/${id}`, contract);
  }

  deleteContract(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contrats/${id}`);
  }

  getHistoriqueModifications(contractId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contrats/${contractId}/historiques`);
  }
}
