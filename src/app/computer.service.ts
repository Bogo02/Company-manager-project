import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { Computers } from './computer';

@Injectable({providedIn: 'root'})
export class ComputerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getComputers(): Observable<Computers[]> {
    return this.http.get<Computers[]>(`${this.apiServerUrl}/computer/all`);
  }
 
  public addComputer(computer: Computers): Observable<Computers> {
    return this.http.post<Computers>(`${this.apiServerUrl}/computer/add`, computer);
  }

  public updateComputer(computer: Computers): Observable<Computers> {
    return this.http.put<Computers>(`${this.apiServerUrl}/computer/update`, computer);
  }

  public deleteComputer(computerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/computer/delete/${computerId}`);
  }
}
