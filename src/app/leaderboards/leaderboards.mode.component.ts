import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { GameSettings } from "../model/game.settings";
import { ApiService } from "../model/apiservice";
import { response } from "express";
import { error } from "console";
import { formatTime } from "../model/utils";
import { PaginationService } from "../model/pagination.service";

@Component({
    selector: 'app-leaderboards-mode-component',
    templateUrl: './leaderboards.mode.component.html',
    imports: [RouterModule, NgFor, NgIf, NgClass],
    standalone: true,
})
export class LeaderboardsModeComponent implements OnInit, OnChanges {
    @Input() selectedMode: string = '';
    leaderboardData: any[] = [];
    paginatedData: any[] = [];
    pageSize: number = 20;
    currentPage: number = 1;
    totalPages: number = 0;

    isLoading: boolean = false;

    constructor(private apiService: ApiService, private paginationService: PaginationService) {}

    ngOnInit(): void {
      this.fetchLeaderboardData();
    }

    ngOnChanges(changes: SimpleChanges): void {
      // Vérifier si `selectedMode` a changé
      if (changes["selectedMode"] && !changes["selectedMode"].firstChange) {
        this.currentPage = 1;
        this.fetchLeaderboardData();  // Re-fetch les données à chaque changement de `selectedMode`
      }
    }

  

  fetchLeaderboardData(): void {
    this.isLoading = true;
    let chosenPhase: string;
      const observer = {
        next: (response: any) => {
          this.leaderboardData = response;
          console.log('Données reçues :', this.leaderboardData);
          this.totalPages = this.paginationService.getTotalPages(this.leaderboardData, this.pageSize);
          this.paginateData();
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des données :', error);
          this.isLoading = false;
        },
        complete: () => {
          console.log('Appel API terminé');
          this.isLoading = false;
        }
      };
      switch (this.selectedMode) {
        case GameSettings.MODE_JUMP:
          chosenPhase = ApiService.JUMP; break;
        case GameSettings.MODE_DONJON:
          chosenPhase = ApiService.DUNGEON; break;
        case GameSettings.MODE_HIPPODROME:
          chosenPhase = ApiService.HIPPODROME; break;
        case GameSettings.MODE_BATEAU:
          chosenPhase = ApiService.BOAT_RACE; break;
        case GameSettings.MODE_ELYTRA:
          chosenPhase = ApiService.ELYTRA; break;
        case GameSettings.MODE_MINAGE:
          chosenPhase = ApiService.MINAGE; break;
        case GameSettings.MODE_ONE_HEART:
          chosenPhase = ApiService.ONE_HEART; break;
        default:
          chosenPhase = ApiService.JUMP;
      }
      this.apiService.getPhaseLeaderboardByPhase(chosenPhase).subscribe(observer);
  }

    // Pagination : filtre les données à afficher en fonction de la page actuelle
  paginateData(): void {
    this.paginatedData = this.paginationService.paginate(this.leaderboardData, this.pageSize, this.currentPage);
  }

  // Changer de page
  changePage(page: number): void {
    this.currentPage = page;
    this.paginateData(); // Recharge les données pour la nouvelle page
  }

  // Méthodes pour naviguer entre les pages
    nextPage(): void {
      if (this.currentPage < Math.ceil(this.leaderboardData.length / this.pageSize)) {
        this.currentPage++;
        this.paginateData();
      }
    }

    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginateData();
      }
    }

    getPosition(index: any) {
      return (this.currentPage - 1) * this.pageSize + index + 1 > 0 ? (this.currentPage - 1) * this.pageSize + index + 1 : 'NA';
    }

    getFormatTime(time: any) {
      return time > 0 ? formatTime(time) : '//';
    }

    getIconSrc(): string {
        switch (this.selectedMode) {
          case GameSettings.MODE_JUMP:
            return 'img/icons/jump.svg';
          case GameSettings.MODE_DONJON:
            return 'img/icons/castle.svg';
          case GameSettings.MODE_HIPPODROME:
            return 'img/icons/horse.svg';
          case GameSettings.MODE_BATEAU:
            return 'img/icons/boat.svg';
          case GameSettings.MODE_ELYTRA:
            return 'img/icons/wings.svg';
          case GameSettings.MODE_MINAGE:
            return 'img/icons/pickaxe.svg';
          case GameSettings.MODE_ONE_HEART:
            return 'img/icons/broken_heart.svg';
          default:
            return 'img/icons/jump.svg';
        }
    }

}