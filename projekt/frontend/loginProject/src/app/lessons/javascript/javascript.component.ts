import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-javascript',
  templateUrl: './javascript.component.html',
  styleUrls: ['./javascript.component.css'],
})
export class JavascriptComponent implements OnInit {
  constructor(private lessonsService: LessonsService) {}
  localStorage:any
  ngOnInit(): void {
    this.lessonsService.setLessons('javascript');
  }
}