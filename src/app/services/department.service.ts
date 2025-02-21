import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'https://bootcampapi20250217.home.aamegremis.com/API/department';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=0&size=10&sort=id,asc`);
  }

  // getDepartment(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${id}`);
  // }

  createDepartment(department: any): Observable<any> {
    return this.http.post(this.apiUrl, department);
  }

  updateDepartment(id: number, department: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
