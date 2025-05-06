import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { DarkModeService } from '../services/dark-mode-service.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileImageUrl: string = 'assets/images/defaultProfile.jpg';
  isDarkMode: boolean = false;
  user: any = null;
  checked = false;
  lastProfilePicturePath: string | null = null;
  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private profileService: ProfileService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDarkModePreference();
    
    if (this.user && this.user.id) {
      this.loadProfilePicture();
    }
  }

  loadUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
          console.log('User data loaded:', this.user);
        } catch (e) {
          console.error('Error parsing user data:', e);
          this.user = null;
        }
      }
    }
  }

  loadDarkModePreference(): void {
    if (this.user && this.user.isDark !== undefined) {
      this.isDarkMode = this.user.isDark === 1;
      this.checked = this.isDarkMode;
      this.applyDarkMode(this.isDarkMode);
    }
  }

  applyDarkMode(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-mode', isDarkMode);
    }
  }

  loadProfilePicture(): void {
    if (!this.user || !this.user.id) return;
    
    this.http.get<any>(`${this.apiUrl}/${this.user.id}`).subscribe({
      next: (response) => {
        this.profileImageUrl = response.profileUrl || 'assets/images/defaultProfile.jpg';
        this.lastProfilePicturePath = response.profileUrl ? this.getFilePathFromUrl(response.profileUrl) : null;
        this.profileService.updateProfilePicture(this.profileImageUrl);
      },
      error: (error) => {
        console.error('Error loading profile picture:', error);
        this.profileImageUrl = 'assets/images/defaultProfile.gif';
      }
    });
  }

  getFilePathFromUrl(url: string): string {
    const fileName = url.split('/').pop();
    return `uploads/${fileName}`;
  }

  deleteOldProfilePicture(): void {
    if (this.lastProfilePicturePath) {
      this.http.delete(`${this.apiUrl}/delete-profile-picture`, { 
        body: { filePath: this.lastProfilePicturePath } 
      }).subscribe({
        next: () => {
          console.log('Old profile picture deleted:', this.lastProfilePicturePath);
        },
        error: (error) => {
          console.error('Error deleting old profile picture:', error);
        }
      });
    }
  }

  changeProfilePicture(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!this.user || !this.user.id) {
        console.error('User or id is missing.');
        return;
      }

      this.deleteOldProfilePicture();

      const formData = new FormData();
      formData.append('image', file);
      const userId = this.user.id;

      this.http.post(`${this.apiUrl}/${userId}/change-profile-picture`, formData)
        .subscribe({
          next: (response: any) => {
            console.log('Profile picture updated:', response);
            this.profileImageUrl = response.imageUrl + '?t=' + Date.now();
            
            if (isPlatformBrowser(this.platformId)) {
              this.user.profileUrl = this.profileImageUrl;
              localStorage.setItem('user', JSON.stringify(this.user));
            }

            this.profileService.updateProfilePicture(this.profileImageUrl);
            this.lastProfilePicturePath = this.getFilePathFromUrl(response.imageUrl);
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error updating profile picture:', error);
          }
        });
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.checked = this.isDarkMode;
    
    if (this.user && this.user.id) {
      this.darkModeService.toggleDarkMode(this.isDarkMode, this.user.id);
      this.user.isDark = this.isDarkMode ? 1 : 0;
      
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    }
    
    this.applyDarkMode(this.isDarkMode);
  }
}