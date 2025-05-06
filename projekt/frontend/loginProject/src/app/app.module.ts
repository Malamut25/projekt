import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { WINDOW } from './login/window.token';
import { QuizzComponent } from './quizz/quizz.component';
import { GaleriaComponent } from './success/success.component';

import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { FoOldalComponent } from './fo-oldal/fo-oldal.component';

import { KapcsolatComponent } from './kapcsolat/kapcsolat.component';

// Importáld a szükséges Angular Material modulokat
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LessonsComponent } from './lessons/lessons.component';
import { HtmlComponent } from './lessons/html/html.component';
import { CssComponent } from './lessons/css/css.component';
import { JavascriptComponent } from './lessons/javascript/javascript.component';
import { GeneralEmailFormComponent } from './general-email-form/general-email-form.component';
import { PhytonComponent } from './lessons/phyton/phyton.component';
import { JavaComponent } from './lessons/java/java.component';
import { SqlComponent } from './lessons/sql/sql.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    QuizzComponent,
    GaleriaComponent,
    CreateQuizComponent,
    NavbarComponent,
    AboutComponent,
    ProfileComponent,
    FoOldalComponent,
    KapcsolatComponent,
    LessonsComponent,
    HtmlComponent,
    CssComponent,
    JavascriptComponent,
    GeneralEmailFormComponent,
    PhytonComponent,
    JavaComponent,
    SqlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSlideToggleModule,
    MatCardModule,
    HttpClientModule,

    // Importáld a hiányzó Angular Material modulokat
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule // Szükséges az Angular Material animációkhoz
  ],
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: WINDOW,
      useFactory: () => {
        if (typeof window !== 'undefined') {
          return window;
        } else {
          return null;
        }
      }
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }