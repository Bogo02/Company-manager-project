import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computers } from './Computers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private apiServerURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getComputers(): Observable<Computers[]> {
    return this.http.get<Computers[]>(`${this.apiServerURL}/computer/all`);
  }

  public addComputer(computer: Computers): Observable<Computers> {
    return this.http.post<Computers>(`${this.apiServerURL}/computer/add`, computer);
  }

  public updateComputer(computer: Computers): Observable<Computers> {
    return this.http.put<Computers>(`${this.apiServerURL}/computer/update`, computer);
  }

  public deleteComputer(computerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/computer/delete/${computerId}`);
  }
}
