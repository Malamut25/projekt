import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { create } from 'domain';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  languageImages: { [key: string]: string } = {
    html: 'assets/images/html.png',
    css: 'assets/images/css.png',
    javascript: 'assets/images/javascript.png',
    
  };

  
  defaultImage: string = 'assets/images/default.jpg';

  // Kiválasztott kép URL-je
  selectedImageUrl: string | null = null;

  // Kiválasztott nyelv
  selectedLanguage: string | null = null;
  newQuiz: any = {
    title: '',
    description: '',
    language_id: null,
    
    questions: [
      {
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correct_answer: null
      }
    ],
    createdby: 0
  };
  
  localStorage:any
  languages: any[] = []; 
  currentQuestionIndex: number = 0; 
  showError: boolean = false;
  user: any = null 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    
          const userData = localStorage.getItem('user');
          if (userData) {
            this.user = JSON.parse(userData);
            console.log('User data:', this.user);
          }
        
    



    this.loadLanguages();
  }

  // Nyelvek betöltése
  loadLanguages(): void {
    this.http.get<any[]>('http://localhost:3000/program_languages').subscribe({
      next: (languages) => {
        this.languages = languages;
      },
      error: (err) => {
        console.error('Hiba a nyelvek betöltésekor:', err);
        alert('Nem sikerült betölteni a nyelveket. Kérjük, próbáld újra később.');
      }
    });
  }

  // Válasz mező értékének lekérése
  getAnswerField(question: any, index: number): string {
    switch (index) {
      case 0: return question.answer1;
      case 1: return question.answer2;
      case 2: return question.answer3;
      case 3: return question.answer4;
      default: return '';
    }
  }

  // Válasz mező értékének beállítása
  setAnswerField(question: any, index: number, value: string): void {
    switch (index) {
      case 0: question.answer1 = value; break;
      case 1: question.answer2 = value; break;
      case 2: question.answer3 = value; break;
      case 3: question.answer4 = value; break;
    }
  }

  // Helyes válasz beállítása
  setCorrectAnswer(index: number): void {
    this.newQuiz.questions[this.currentQuestionIndex].correct_answer = index;
  }

  // Következő kérdésre lépés
  nextQuestion(): void {
    if (this.isCurrentQuestionValid()) {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.newQuiz.questions.length) {
        this.newQuiz.questions.push({
          question: '',
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          correct_answer: null
        });
      }
      this.showError = false; // Hibajelzés elrejtése
    } else {
      this.showError = true; // Hibajelzés megjelenítése
    }
  }

  // Előző kérdésre lépés
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showError = false; // Hibajelzés elrejtése
    }
  }

  // Aktuális kérdés érvényességének ellenőrzése
  isCurrentQuestionValid(): boolean {
    const question = this.newQuiz.questions[this.currentQuestionIndex];
    const answers = [question.answer1, question.answer2, question.answer3, question.answer4];

    // Ellenőrizzük, hogy minden válasz kitöltve van-e
    if (answers.some(answer => !answer || answer.trim() === '')) {
      return false;
    }

    // Ellenőrizzük, hogy nincsenek-e ismétlődő válaszok
    const uniqueAnswers = new Set(answers);
    if (uniqueAnswers.size !== answers.length) {
      return false;
    }

    // Ellenőrizzük, hogy van-e kiválasztott helyes válasz
    if (question.correct_answer === null) {
      return false;
    }

    return true;
  }

  // Kvíz érvényességének ellenőrzése
  isQuizValid(): boolean {
    // Ellenőrizzük, hogy a kvíz címe és leírása kitöltve van-e
    if (!this.newQuiz.title || !this.newQuiz.description || !this.newQuiz.language_id) {
      return false;
    }

    // Ellenőrizzük, hogy minden kérdés érvényes-e
    return this.newQuiz.questions.every((question: any) => {
      const answers = [question.answer1, question.answer2, question.answer3, question.answer4];
      const uniqueAnswers = new Set(answers);
      return (
        answers.every(answer => answer && answer.trim() !== '') &&
        uniqueAnswers.size === answers.length &&
        question.correct_answer !== null
      );
    });
  }


  saveQuiz(): void {
    if (this.isQuizValid()) {
      if (this.selectedFile) {
        // 1. Képfeltöltés
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.http.post<{ imageUrl: string }>('http://localhost:3000/upload', formData).subscribe({
          next: (uploadResponse) => {
            // 2. Kvíz adatainak összeállítása a kép URL-jével
            const quizData = {
              title: this.newQuiz.title,
              description: this.newQuiz.description,
              language_id: this.newQuiz.language_id,
              imgUrl: uploadResponse.imageUrl, // Kép URL-je
              questions: this.newQuiz.questions,
              createdby: this.user.id
            };

            // 3. Kvíz mentése
            this.http.post('http://localhost:3000/quizzes', quizData).subscribe({
              next: (response) => {
                alert('Kvíz sikeresen mentve!');
                this.router.navigate(['/success']);
              },
              error: (error) => {
                console.error('Hiba a kvíz mentésekor:', error);
                alert('Hiba történt a kvíz mentése során. Kérjük, próbáld újra.');
              }
            });
          },
          error: (uploadError) => {
            console.error('Hiba a kép feltöltésekor:', uploadError);
            alert('Hiba történt a kép feltöltése során. Kérjük, próbáld újra.');
          }
        });
      } else {
        // Save quiz without image
        const quizData = {
          title: this.newQuiz.title,
          description: this.newQuiz.description,
          language_id: this.newQuiz.language_id,
          questions: this.newQuiz.questions,
          createdby: this.user.id
        };

        this.http.post('http://localhost:3000/quizzes', quizData).subscribe({
          next: (response) => {
            alert('Kvíz sikeresen mentve!');
            this.router.navigate(['/success']);
          },
          error: (error) => {
            console.error('Hiba a kvíz mentésekor:', error);
            alert('Hiba történt a kvíz mentése során. Kérjük, próbáld újra.');
          }
        });
      }
    } else {
      this.showError = true;
    }
  }
  imagePreview: string | null = null;
selectedFile: File | null = null;

onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files[0]) {
    this.selectedFile = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
}