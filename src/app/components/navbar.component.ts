import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../model/apiservice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [RouterModule, NgIf, NgClass, FormsModule]
})
export class NavbarComponent { 
  isMenuOpen: boolean = false;
  searchQuery: string = '';
  searchHasError: boolean = false;
  hideTitle: boolean = false;

  constructor(private router: Router, private apiService : ApiService) {
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
      this.findUUIdByUsername();
      this.searchHasError = false;
      console.log(`Recherche pour : ${this.searchQuery}`);
    }
  }

  findUUIdByUsername() {
  const observer = {
      next: (response: any) => {
        this.router.navigate(['/leaderboards', 'profile', response.name]);
        //this.uuid = formatUUID(response.id);
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des données :', error);
        this.setError();
      },
      complete: () => {
        console.log('Appel API terminé');
      }
    };
      this.apiService.getUUIDByUsername(this.searchQuery).subscribe(observer);
  }
  

  setError() {
    this.searchHasError = true;
      setTimeout(() => {
        this.searchHasError = false;
      }, 300)
  }

}