import { Component } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css']
})
export class SqlComponent {
  constructor(private lessonsService: LessonsService) {}
  localStorage:any
    ngOnInit(): void {
      this.lessonsService.setLessons('sql');
    }
}
