import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent implements OnInit {
  lessons$ = this.lessonsService.lessons$;
  selectedLesson: any = null;
  dark: boolean = false; 
  user: any = null;
  isDarkMode = false;

  constructor(
    private lessonsService: LessonsService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDarkModePreference();

    this.route.params.subscribe(params => {
      const type = params['type'];
      this.lessonsService.setLessons(type);
    });

    this.lessons$.subscribe(lessons => {
      if (lessons.length > 0) {
        this.selectedLesson = lessons[0]; // Default to first lesson
      }
    });
  }

  selectLesson(lesson: any): void {
    this.selectedLesson = lesson;
  }

  loadDarkModePreference(): void {
    if (this.user && this.user.isDark !== undefined) {
      this.dark = this.user.isDark === 1;
      this.applyDarkMode(this.dark);
    }
  }

  loadUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        console.log('User data loaded:', this.user);
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