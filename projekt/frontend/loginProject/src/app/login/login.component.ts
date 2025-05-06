import { Component, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from '../services/navbar.service';
import { ProfileService } from '../services/profile.service';
import { DarkModeService } from '../services/dark-mode-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit, OnDestroy {
  username = '';
  password = '';
  errorMessage: string = '';
  localStorage: any;
  private apiUrl: string = 'http://localhost:3000';  // API URL közvetlenül itt
  passwordVisible = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private elementRef: ElementRef,
    private navbarService: NavbarService,
    private profileService: ProfileService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    // Navbar elrejtése
    this.navbarService.setShowNavbar(false);

    // Böngésző történet manipulálása: vissza gomb tiltása
    if (typeof window !== 'undefined') {
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', this.preventBackNavigation);
    }
  }

  ngAfterViewInit(): void {
    // Ellenőrizzük, hogy böngésző környezetben vagyunk-e
    if (typeof window !== 'undefined') {
      this.generateStars();
    }
  }

  ngOnDestroy(): void {
    // Navbar visszaállítása, amikor a komponens megszűnik
    this.navbarService.setShowNavbar(true);

    // Eseményfigyelő eltávolítása, amikor a komponens elpusztul
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', this.preventBackNavigation);
    }
  }

  preventBackNavigation = (event: PopStateEvent) => {
    history.pushState(null, '', location.href);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  generateStars(): void {
    const starsContainer = this.elementRef.nativeElement.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.position = 'absolute';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.width = '2px';
      star.style.height = '2px';
      star.style.background = 'white';
      star.style.borderRadius = '50%';
      starsContainer.appendChild(star);
    }
  }

  login(): void {
    this.http.post<{ token: string, user: any }>(`${this.apiUrl}/login`, {
      username: this.username,
      password: this.password
    }).subscribe(
      (response) => {
        console.log('Login successful', response);

        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        this.profileService.updateProfilePicture(response.user.profileUrl);
        this.darkModeService.toggleDarkMode(response.user.isDark, response.user.id);

        // Sikeres bejelentkezés után navigálás
        this.router.navigate(['/fo-oldal'], { state: { user: response.user } });
      },
      (error) => {
        console.error('Login failed', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      }
    );
  }
}
