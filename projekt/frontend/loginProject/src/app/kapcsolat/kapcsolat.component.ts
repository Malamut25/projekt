import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-kapcsolat',
  templateUrl: './kapcsolat.component.html',
  styleUrls: ['./kapcsolat.component.css'],
})
export class KapcsolatComponent implements OnInit {
  message: string = ''; // Az üzenet szövege
  isSending: boolean = false; // Küldés folyamatban van-e
  isSuccess: boolean = false; // Sikeres küldés
  isError: boolean = false; // Hiba történt-e
  dark: boolean = false; 
  user: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDarkModePreference();
  }

  onSubmit() {
    if (!this.message) return; // Ha nincs üzenet, ne küldjük el

    this.isSending = true;
    this.isSuccess = false;
    this.isError = false;

    // Szimuláljuk az üzenetküldést (pl. HTTP kérés)
    setTimeout(() => {
      this.isSending = false;

      // Sikeres vagy sikertelen küldés szimulálása
      const isSuccessful = Math.random() > 0.2; // 80% eséllyel sikeres
      if (isSuccessful) {
        this.isSuccess = true;
        this.message = ''; // Üzenet mező ürítése
      } else {
        this.isError = true;
      }

      // 5 másodperc után eltüntetjük a visszajelzést
      setTimeout(() => {
        this.isSuccess = false;
        this.isError = false;
      }, 5000);
    }, 2000); // 2 másodperc késleltetés
  }

  loadDarkModePreference(): void {
    if (this.user && this.user.isDark !== undefined) {
      this.dark = this.user.isDark === 1;
      this.applyDarkMode(this.dark);
    } else {
      this.dark = false;
      this.applyDarkMode(false);
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

  applyDarkMode(isDarkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Setting dark mode:', isDarkMode);
      document.body.classList.toggle('dark-mode', isDarkMode);
    }
  }
}