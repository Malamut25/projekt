import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/users';  // Backend URL

  constructor(private http: HttpClient) {}

  // Method to authenticate the user based on username and password
  login(username: string, password: string): Observable<any> {
    // Make a GET request to fetch the user based on username and password
    return this.http.get<any>(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  // Method to fetch a user by ID (after successful login)
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}