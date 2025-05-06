import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css'],
})
export class HtmlComponent implements OnInit {
  constructor(private lessonsService: LessonsService) {}
  localStorage:any
  ngOnInit(): void {
    this.lessonsService.setLessons('html');
  }
}