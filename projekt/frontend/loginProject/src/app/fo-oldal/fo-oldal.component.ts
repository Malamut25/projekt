import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { ProfileService } from '../services/profile.service';
import { DarkModeService } from '../services/dark-mode-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-fo-oldal',
  templateUrl: './fo-oldal.component.html',
  styleUrls: ['./fo-oldal.component.css']
})
export class FoOldalComponent implements OnInit {
  user: any = null;
  isDarkMode: boolean = false;

  constructor(
    private navbarService: NavbarService,
    private profileService: ProfileService,
    private darkModeService: DarkModeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDarkModePreference();
    this.navbarService.setShowNavbar(true);
  }

  loadUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  }

  loadDarkModePreference(): void {
    if (this.user && this.user.isDark !== undefined) {
      this.isDarkMode = this.user.isDark === 1;
      this.applyDarkMode(this.isDarkMode);
    }
  }

  applyDarkMode(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-mode', isDarkMode);
    }
  }
}
