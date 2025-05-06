import { Component } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-phyton',
  templateUrl: './phyton.component.html',
  styleUrl: './phyton.component.css'
})
export class PhytonComponent {
constructor(private lessonsService: LessonsService) {}
localStorage:any
  ngOnInit(): void {
    this.lessonsService.setLessons('phyton');
  }
}
