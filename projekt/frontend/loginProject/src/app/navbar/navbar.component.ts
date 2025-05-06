import { Component, Inject, OnInit, PLATFORM_ID, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { LessonsService } from '../services/lessons.service';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: any = null;
  isDropdownOpen: boolean = false;
  isLessonsDropdownOpen: boolean = false;
  profileImageUrl: string = 'assets/images/defaultProfile.jpg';
  isMobileView: boolean = false;
  private profilePictureSubscription: Subscription | null = null;
  private userDataSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private profileService: ProfileService,
    private lessonsService: LessonsService
  ) {}

  ngOnInit(): void {
    this.checkMobileView();
    this.loadUserData();
    this.setupRouterEvents();

    if (isPlatformBrowser(this.platformId)) {
      // Először betöltjük a localStorage-ból a képet
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.profileImageUrl = user.profileUrl || 'assets/images/defaultProfile.jpg';
      }

      // Feliratkozunk a profil kép változásaira
      this.profilePictureSubscription = this.profileService.profilePicture$.subscribe(url => {
        this.profileImageUrl = url || 'assets/images/defaultProfile.jpg';
      });
    }
  }

  ngOnDestroy(): void {
    // Leiratkozunk a feliratkozásokról a memóriaszivárgás elkerülése érdekében
    if (this.profilePictureSubscription) {
      this.profilePictureSubscription.unsubscribe();
    }
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  private checkMobileView(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768;
    }
  }

  private loadUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        // Itt már nem állítjuk be a profileImageUrl-t, mert a feliratkozás kezeli
      }
    }
  }

  private setupRouterEvents(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeAllDropdowns();
      });
  }

  closeAllDropdowns(): void {
    this.isLessonsDropdownOpen = false;
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown') && 
        !(event.target as HTMLElement).closest('.lessons-dropdown') &&
        !(event.target as HTMLElement).closest('.profile-section')) {
      this.closeAllDropdowns();
    }
  }

  navigateToCreateQuiz(): void {
    this.router.navigate(['/create-quiz']);
    this.closeAllDropdowns();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.isLessonsDropdownOpen = false;
    }
  }

  toggleLessonsDropdown(event: Event): void {
    event.stopPropagation();
    this.isLessonsDropdownOpen = !this.isLessonsDropdownOpen;
    if (this.isLessonsDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeAllDropdowns();
  }

  navigateToHome(): void {
    this.router.navigate(['/fo-oldal']);
    this.closeAllDropdowns();
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']);
    this.closeAllDropdowns();
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
    this.closeAllDropdowns();
    this.user = null;
    this.profileImageUrl = 'assets/images/defaultProfile.jpg';
  }

  navigateToLesson(type: string): void {
    this.lessonsService.setLessons(type);
    this.router.navigate(['/lessons', type]);
    this.closeAllDropdowns();
  }

  handleMobileLinkClick(event: Event): void {
    if (this.isMobileView) {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target.classList.contains('nav-link')) {
        const route = target.getAttribute('routerLink');
        if (route) {
          this.router.navigate([route]);
        }
      }
    }
  }
}