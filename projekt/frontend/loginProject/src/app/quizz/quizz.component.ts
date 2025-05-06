import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IsDoneService } from '../services/is-done.service';

interface Answer {
  text: string;
  correct: boolean;
  selected?: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
  correctAnswerIndex?: number;
}

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  isDarkMode: boolean = false;
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  score: number = 0;
  quizOver: boolean = false;
  quizMessage: string = '';
  timeLeft: number = 30;
  timer: any;
  percentage: number = 0;
  selectedRating: number = 0;
  quizId: string | null = null;
  showRating: boolean = false;
  user: any = null;

  isDoneData = {
    user_id: 0,
    quizz_id: 0,
    done: 1
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private isDoneService: IsDoneService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDarkModePreference();
    
    if (isPlatformBrowser(this.platformId)) {
      const state = history.state;
      console.log('Quiz data from state:', state);
      
      if (state?.quiz) {
        this.quizId = state.quiz.id;
        this.isDoneData.quizz_id = state.quiz.id;
        this.loadQuizFromState(state.quiz);
      } else {
        this.loadDefaultQuiz();
      }
    }
  }

  loadUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
          console.log('User data loaded:', this.user);
          this.isDoneData.user_id = this.user?.id || 0;
        } catch (e) {
          console.error('Error parsing user data:', e);
          this.user = null;
        }
      }
    }
  }

  loadDarkModePreference(): void {
    if (isPlatformBrowser(this.platformId)) {
      const darkModePreference = localStorage.getItem('darkMode');
      if (darkModePreference) {
        this.isDarkMode = JSON.parse(darkModePreference) === true;
        console.log('Dark mode setting:', this.isDarkMode);
        document.body.classList.toggle('dark-mode', this.isDarkMode);
      } else {
        console.log('No dark mode setting in localStorage');
      }
    }
  }

  loadQuizFromState(quiz: any): void {
    console.log('Quiz data:', quiz);
    if (!quiz.questions) {
      console.error('Quiz data is missing the "questions" property:', quiz);
      return;
    }
    this.questions = this.transformQuizData(quiz.questions);
    this.currentQuestion = this.questions[0];
    this.startTimer();
  }

  loadDefaultQuiz(): void {
    this.http.get<any[]>('http://localhost:3000/practice').subscribe({
      next: (data) => {
        this.questions = this.transformQuizData(data);
        this.currentQuestion = this.questions[0];
        this.startTimer();
      },
      error: (error) => {
        console.error('Error loading quiz:', error);
        alert('Failed to load the quiz. Please try again later.');
      }
    });
  }

  transformQuizData(quizData: any[]): Question[] {
    const shuffledQuestions = this.shuffleArray(quizData);

    return shuffledQuestions.map((question) => {
      const answers = [
        { text: question.answer1, correct: question.correct_answer === 0 },
        { text: question.answer2, correct: question.correct_answer === 1 },
        { text: question.answer3, correct: question.correct_answer === 2 },
        { text: question.answer4, correct: question.correct_answer === 3 },
      ];
      const shuffledAnswers = this.shuffleArray(answers);
      const correctAnswerIndex = shuffledAnswers.findIndex((answer) => answer.correct);

      return {
        question: question.question,
        answers: shuffledAnswers,
        correctAnswerIndex: correctAnswerIndex,
      };
    });
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startTimer(): void {
    this.timeLeft = 30;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.checkAnswer(null); 
      }
    }, 1000);
  }

  checkAnswer(selectedAnswer: Answer | null): void {
    if (this.quizOver) return;

    clearInterval(this.timer);

    if (selectedAnswer) {
      selectedAnswer.selected = true;
      if (selectedAnswer.correct) {
        this.score++;
      }
    }

    const currentIndex = this.questions.indexOf(this.currentQuestion!);
    if (currentIndex + 1 < this.questions.length) {
      this.currentQuestion = this.questions[currentIndex + 1];
      this.startTimer();
    } else {
      this.quizOver = true;
      this.calculateQuizResult();
    }
  }

  calculateQuizResult(): void {
    this.percentage = (this.score / this.questions.length) * 100;
    if (this.percentage < 40) {
      this.quizMessage = `Sajnos megbuktál! (${this.percentage.toFixed(2)}%)`;
    } else {
      this.quizMessage = `🎉 Gratulálunk, sikeres lett a kvíz! 🎉 (${this.percentage.toFixed(2)}%)`;
      this.postIsDone();
      if (this.percentage >= 70) {
        this.showRating = true; 
      }
    }
  }

  getProgressColor(): string {
    const ratio = this.timeLeft / 30;
    const red = Math.floor(255 * (1 - ratio));
    const green = Math.floor(255 * ratio);
    return `rgb(${red}, ${green}, 0)`;
  }

  rateQuiz(event: Event): void {
    this.selectedRating = Number((event.target as HTMLInputElement).value);
  }

  submitRating(): void {
    if (!this.quizId || this.selectedRating === 0) {
      alert('Please select a rating!');
      return;
    }

    this.http.put(`http://localhost:3000/quizzes/${this.quizId}/rate`, { rating: this.selectedRating })
      .subscribe({
        next: () => {
          alert('Köszönjük az értékeléset!');
          this.goToHome();
        },
        error: (error) => {
          console.error('Error submitting rating:', error);
          alert('Failed to submit the rating. Please try again later.');
        }
      });
  }

  postIsDone() {
    if (this.isDoneData.user_id && this.isDoneData.quizz_id) {
      this.isDoneService.postIsDone(this.isDoneData).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.warn('Cannot post isDone - missing user_id or quizz_id');
    }
  }

  goToHome(): void {
    this.router.navigate(['/success']);
  }
}