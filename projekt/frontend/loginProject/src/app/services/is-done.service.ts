import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsDoneService {

  private apiUrl = 'http://localhost:3000/isdone'; // Your API endpoint

  constructor(private http: HttpClient) { }

  postIsDone(isDoneData: any): Observable<any> {
    return this.http.post(this.apiUrl, isDoneData);
  }
}
