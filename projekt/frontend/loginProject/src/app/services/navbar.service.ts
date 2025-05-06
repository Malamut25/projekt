import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private showNavbarSubject = new BehaviorSubject<boolean>(true);
  showNavbar$ = this.showNavbarSubject.asObservable();

  // Metódus a navbar megjelenítésének beállításához
  setShowNavbar(show: boolean): void {
    this.showNavbarSubject.next(show);
  }
}