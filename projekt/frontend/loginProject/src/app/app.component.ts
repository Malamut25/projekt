import { Component } from '@angular/core';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loginProject';
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    // Navbar alapértelmezés szerint látható
    this.navbarService.setShowNavbar(true);
  }
}
