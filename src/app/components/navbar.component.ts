import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [RouterModule, NgIf, NgClass, FormsModule]
})
export class NavbarComponent {
  // homeLinkActive = false;
  // leaderboardsLinkActive = false;
  // rulesLinkActive = false; 
  isMenuOpen: boolean = false;
  searchQuery: string = '';
  searchHasError: boolean = false;
  hideTitle: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Cache l'élément si la route est '/leaderboards' ou '/rules'
      this.hideTitle = ['/home'].includes(this.router.url);
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.setError();
    } else {
      this.searchHasError = false;
      console.log(`Recherche pour : ${this.searchQuery}`);
    }
  }

  setError() {
    this.searchHasError = true;
      setTimeout(() => {
        this.searchHasError = false;
      }, 300)
  }

}