import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

interface User {
  username: string;
  password: string;
  teacher: boolean;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit, OnDestroy {
  signupUsername: string = '';
  signupPassword: string = '';
  signupMessage: string = '';
  isTeacher: boolean = false;
  passwordVisible = false;
  isErrorMessage: boolean = false;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private elementRef: ElementRef,
    private navbarService: NavbarService
  ) {}

  ngAfterViewInit(): void {
    this.generateStars();
  }

  ngOnInit(): void {
    this.navbarService.setShowNavbar(false);
  }

  ngOnDestroy(): void {
    this.navbarService.setShowNavbar(true);
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

  onChange(event: any) {
    this.isTeacher = event.target.checked;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  signup(): void {
    // Reset message
    this.signupMessage = '';
    this.isErrorMessage = false;

    // Validations
    if (!this.signupUsername || !this.signupPassword) {
      this.signupMessage = 'Kérlek, adj meg egy felhasználónevet és jelszót!';
      this.isErrorMessage = true;
      return;
    }

    if (this.signupPassword.length < 8) {
      this.signupMessage = 'A jelszónak legalább 8 karakter hosszúnak kell lennie.';
      this.isErrorMessage = true;
      return;
    }

    const userData: User = {
      username: this.signupUsername,
      password: this.signupPassword,
      teacher: this.isTeacher
    };

    const apiUrl = 'http://localhost:3000/signup';

    this.http.post<{ message: string }>(apiUrl, userData).subscribe({
      next: (response) => {
        this.signupMessage = 'Sikeres regisztráció! Átirányítás a bejelentkezéshez...';
        this.isErrorMessage = false;
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (error) => {
        console.error('Hiba a regisztráció során:', error);
        
        // Improved error handling
        if (error.error && typeof error.error === 'object' && 'message' in error.error) {
          if (error.error.message.includes('User already exists')) {
            this.signupMessage = 'Felhasználó már létezik. Kérlek, válassz másik nevet.';
          } else {
            this.signupMessage = error.error.message || 'Hiba történt a regisztráció során.';
          }
        } else {
          this.signupMessage = 'Felhasználó már létezik. Kérlek, válassz másik nevet.';
        }
        
        this.isErrorMessage = true;
      }
    });
  }
}