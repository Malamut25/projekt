import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profilePictureSource = new BehaviorSubject<string | null>(null);
  profilePicture$ = this.profilePictureSource.asObservable();
  private apiUrl = 'http://localhost:3000/users';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadInitialProfilePicture();
  }

  private loadInitialProfilePicture(): void {
    if (this.isBrowser) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          this.profilePictureSource.next(user.profileUrl || 'assets/images/defaultProfile.jpg');
        } catch (e) {
          this.profilePictureSource.next('assets/images/defaultProfile.jpg');
        }
      } else {
        this.profilePictureSource.next('assets/images/defaultProfile.jpg');
      }
    } else {
      this.profilePictureSource.next('assets/images/defaultProfile.jpg');
    }
  }

  updateProfilePicture(url: string): void {
    this.profilePictureSource.next(url);
    
    if (this.isBrowser) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          user.profileUrl = url;
          localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
          console.error('Error updating user data in localStorage:', e);
        }
      }
    }
  }

  deleteProfilePicture(filePath: string) {
    return this.http.delete(`${this.apiUrl}/delete-profile-picture`, { 
      body: { filePath } 
    }).pipe(
      catchError(error => {
        console.error('Error deleting profile picture:', error);
        return throwError(() => error);
      })
    );
  }

  changeProfilePicture(userId: number, formData: FormData) {
    return this.http.post(`${this.apiUrl}/${userId}/change-profile-picture`, formData).pipe(
      catchError(error => {
        console.error('Error changing profile picture:', error);
        return throwError(() => error);
      })
    );
  }
}