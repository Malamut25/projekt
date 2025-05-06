import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { DarkModeService } from '../services/dark-mode-service.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-success', // A selector marad success
  templateUrl: './success.component.html', // A template marad success
  styleUrls: ['./success.component.css'] // A stílus fájl marad success
})
export class GaleriaComponent implements OnInit { // Az osztály neve GaleriaComponent
  isButtonHidden = true;
  user: any = null;
  userdata: any;
  dark: boolean = false; 

  letrehozottKvizek: any[] = [];
  filteredKvizek: any[] = []; // Szűrt kvízek
  searchTerm: string = ''; // Keresési kifejezés
  defaultImage = 'assets/images/default.jpg'; // Alapértelmezett kép a létrehozott kvízekhez
  current: any;
  localStorage:any
  languages: any[] = [];
  quiz: any; // Store the current quiz
 
  isDarkMode: boolean = false;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute ,
    private profileService: ProfileService,
    private darkModeService: DarkModeService,
     private navbarService: NavbarService,// Added ActivatedRoute to access route parameters
  ) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        console.log('Felhasználó adatai:', this.user);
      } else {
        console.log('Nincsenek felhasználói adatok a localStorage-ban.');
      }
      
      this.loadLanguages();
      this.loadQuizzes();
      this.loadUserData();
      this.loadDarkModePreference()
      this.navbarService.setShowNavbar(true);
    }
    
    // Fetch the quiz by ID from the route parameter
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.http.get(`http://localhost:3000/quizzes/${quizId}`).subscribe({
        next: (quiz: any) => {
          // Calculate the rating based on numberOfRates and totalRates
          quiz.rating = this.calculateRating(quiz.numberOfRates, quiz.totalRates);
          this.quiz = quiz;
          console.log('Quiz fetched:', this.quiz);
        },
        error: (error) => {
          console.error('Error fetching quiz:', error);
        }
      });
    }
  }



  applyDarkMode(isDarkMode: boolean): void {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }

  // Helper function to calculate the rating
  calculateRating(numberOfRates: number, totalRates: number): number {
    if (numberOfRates === 0) return 0;else{ // Ha nincs értékelés, akkor 0
    return Math.ceil(totalRates / numberOfRates); }// Felfelé kerekített átlag
  }

  loadLanguages(): void {
    this.http.get<any[]>('http://localhost:3000/program_languages').subscribe({
      next: (languages) => {
        this.languages = languages;
      },
      error: (err) => {
        console.error('Error fetching languages:', err);
        alert('Failed to load languages. Please try again later.');
      }
    });
  }

  loadQuizzes(): void {
    this.http.get<any[]>(`http://localhost:3000/quizzes/${this.user.id}`).subscribe({
      next: (data: any) => {
        this.letrehozottKvizek = data.map((quiz: { imgUrl: any; numberOfRates: number; totalRates: number }) => ({
          ...quiz,
          image: quiz.imgUrl || this.defaultImage,
          rating: this.calculateRating(quiz.numberOfRates, quiz.totalRates) // Calculate rating for each quiz
        }));
        this.applyFilters(); // Frissítjük a szűrt kvízeket
        console.log('Létrehozott kvízek:', this.letrehozottKvizek);
      },
      error: (error) => {
        console.error('Error loading quizzes:', error);
      }
    });
  }

  startQuiz(quiz: any, isDefaultQuiz: boolean = false): void {
    if (isPlatformBrowser(this.platformId)) {
      if (isDefaultQuiz) {
        this.router.navigate(['/quizz'], { state: { quiz } });
      } else {
        this.http.get(`http://localhost:3000/practice?quiz_id=${quiz.id}`).subscribe({
          next: (questions: any) => {
            const quizWithQuestions = { ...quiz, questions };
            this.router.navigate(['/quizz'], { state: { quiz: quizWithQuestions } });
          },
          error: (error) => {
            console.error('Error loading quiz questions:', error);
          }
        });
      }
    }
  }

  deleteQuiz(index: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const quiz = this.letrehozottKvizek[index];
      const quizName = quiz.title || 'Névtelen kvíz';
      const confirmDelete = confirm(`Biztos törölni akarod a "${quizName}" nevű kvízt?`);
  
      if (confirmDelete) {
        // Make a single HTTP request to delete the quiz and its associated questions
        this.http.delete(`http://localhost:3000/quizzes/${quiz.id}`).subscribe({
          next: () => {
            this.letrehozottKvizek.splice(index, 1); // Remove the quiz from the local array
            this.applyFilters(); // Frissítjük a szűrt kvízeket
            alert('A kvíz sikeresen törölve!');
          },
          error: (error) => {
            console.error('Error deleting quiz:', error);
            alert('Hiba történt a kvíz törlése közben. Próbáld újra később.');
          }
        });
      }
    }
  }
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  selectedRating: number | null = null; // Kiválasztott értékelés
  selectedLanguage: number | null = null; // Kiválasztott nyelv

  minRating: number = 0; // Minimum értékelés
  maxRating: number = 5; // Maximum értékelés

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  onLanguageFilter(event: Event): void {
    this.selectedLanguage = Number((event.target as HTMLSelectElement).value);
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredKvizek = this.letrehozottKvizek.filter(quiz => {
      const matchesSearchTerm = quiz.title.toLowerCase().includes(this.searchTerm);
      const matchesRating = quiz.rating >= this.minRating && quiz.rating <= this.maxRating;
      const matchesLanguage = this.selectedLanguage ? quiz.language_id === this.selectedLanguage : true;

      return matchesSearchTerm && matchesRating && matchesLanguage;
    });
  }
  loadDarkModePreference(): void {
    if (this.user && this.user.isDark !== undefined) {
      this.isDarkMode = this.user.isDark === 1;
      this.applyDarkMode(this.isDarkMode);
    }
  }
  
  loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
  
      console.log(this.user)
  
      
  
    }
  }

   
}