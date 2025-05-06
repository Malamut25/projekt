import { Component } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-java',
  templateUrl: './java.component.html',
  styleUrl: './java.component.css'
})
export class JavaComponent {
  constructor(private lessonsService: LessonsService) {}
  localStorage:any
  ngOnInit(): void {
    this.lessonsService.setLessons('java');
  }
}
