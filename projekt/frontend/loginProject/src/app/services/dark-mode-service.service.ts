import { Injectable, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService implements OnInit {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();
  userdata: any = null;
  user: any[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userdata = localStorage.getItem("user");
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      this.darkModeSubject.next(savedDarkMode);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
          console.log('Felhasználó adatai:', this.user);
        } catch (e) {
          console.error('Hibás JSON adat a localStorage-ban:', e);
        }
      } else {
        console.log('Nincsenek felhasználói adatok a localStorage-ban.');
      }

      if (this.user) {
        localStorage.setItem('darkMode', this.user.toString());
      }
    }
  }

  toggleDarkMode(isDark: boolean, userId?: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', isDark.toString());
    }

    this.darkModeSubject.next(isDark);

    if (userId) {
      // Update dark mode in the backend
      this.http.put(`http://localhost:3000/users/${userId}/isDark`, { isDark })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error updating dark mode in the backend:', error);
            return throwError(() => new Error('Failed to update dark mode. Please try again later.'));
          })
        )
        .subscribe({
          next: () => {
            console.log('Dark mode updated in the backend');
          },
          error: (error) => { 
            console.error('Error updating dark mode in the backend:', error);
          },
        });
    }
  }

  // Segédfüggvény a localStorage biztonságos eléréséhez
  private safeLocalStorageGet(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private safeLocalStorageSet(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }
}