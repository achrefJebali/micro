import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from '../models/university.model';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiUrl = 'http://localhost:8081/universite';

  constructor(private http: HttpClient) { }

  getAllUniversities(): Observable<University[]> {
    return this.http.get<University[]>(`${this.apiUrl}/universites`);
  }

  getUniversityById(id: number): Observable<University> {
    return this.http.get<University>(`${this.apiUrl}/universites/${id}`);
  }

  createUniversity(university: University): Observable<University> {
    return this.http.post<University>(`${this.apiUrl}/universites`, university);
  }

  updateUniversity(id: number, university: University): Observable<University> {
    return this.http.put<University>(`${this.apiUrl}/universites/${id}`, university);
  }

  deleteUniversity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/universites/${id}`);
  }
}
