import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarService } from '../services/navbar.service';
import { DarkModeService } from '../services/dark-mode-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isDarkMode: boolean = false;
  user: any = null;
  private apiUrl = 'http://localhost:3000/users'; // Your backend URL

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private navbarService: NavbarService,
    private darkModeService: DarkModeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserData();
      this.loadDarkModePreference();
      this.navbarService.setShowNavbar(true);
    }
  }

  loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('User data:', this.user);
    }
  }

  loadDarkModePreference(): void {
    if (this.user && this.user.isDark !== undefined) {
      this.isDarkMode = this.user.isDark === 1;
      this.applyDarkMode(this.isDarkMode);
    }
  }

  applyDarkMode(isDarkMode: boolean): void {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeService.toggleDarkMode(this.isDarkMode, this.user.id);
    this.user.isDark = this.isDarkMode ? 1 : 0;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.applyDarkMode(this.isDarkMode);
    this.cdr.detectChanges();
  }

}