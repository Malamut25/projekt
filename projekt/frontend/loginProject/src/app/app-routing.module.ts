import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { SignupComponent } from './signup/signup.component';
import { QuizzComponent } from './quizz/quizz.component';
import { GaleriaComponent } from './success/success.component';
import { ProfileComponent } from './profile/profile.component';
import { FoOldalComponent } from './fo-oldal/fo-oldal.component';
import { AboutComponent } from './about/about.component';
import { KapcsolatComponent } from './kapcsolat/kapcsolat.component';
import { LessonsComponent } from './lessons/lessons.component';
import { HtmlComponent } from './lessons/html/html.component';
import { CssComponent } from './lessons/css/css.component';
import { JavascriptComponent } from './lessons/javascript/javascript.component';
import { PhytonComponent } from './lessons/phyton/phyton.component';
import { JavaComponent } from './lessons/java/java.component';
import { SqlComponent } from './lessons/sql/sql.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'fo-oldal', component: FoOldalComponent },
  { path: 'about', component: AboutComponent },
  { path: 'success', component: GaleriaComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'kapcsolat', component: KapcsolatComponent },
  { path: 'quizz', component: QuizzComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'lessons', component: LessonsComponent, children: [
    { path: 'html', component: HtmlComponent },
    { path: 'css', component: CssComponent },
    { path: 'javascript', component: JavascriptComponent },
    { path: 'phyton', component: PhytonComponent },
    { path: 'java', component: JavaComponent },
    { path: 'sql', component: SqlComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}