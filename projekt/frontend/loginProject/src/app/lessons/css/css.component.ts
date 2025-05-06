import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-css',
  templateUrl: './css.component.html',
  styleUrls: ['./css.component.css'],
})
export class CssComponent implements OnInit {
  constructor(private lessonsService: LessonsService) {}
  localStorage:any
  ngOnInit(): void {
    this.lessonsService.setLessons('css');
  }
}