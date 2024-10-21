import { Component, Input, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { GameSettings } from "../model/game.settings";
import { ApiService } from "../model/apiservice";
import { formatTime, formatTimeWithMilliseconds } from "../model/utils";
import { PaginationService } from "../model/pagination.service";

@Component({
    selector: 'app-leaderboards-global-component',
    templateUrl: './leaderboards.global.component.html',
    imports: [RouterModule, NgFor, NgClass, NgIf],
    standalone: true,
})
export class LeaderboardsGlobalComponent {
  @Input() selectedMode: string = '';
  leaderboardData: any[] = [];
  paginatedData: any[] = [];
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  gameSettings = GameSettings;

  isLoading: boolean = false;

  constructor(private apiService: ApiService, private paginationService: PaginationService) {}

  ngOnInit(): void {
      this.fetchLeaderboardData();
    }
  
  ngOnChanges(changes: SimpleChanges): void {
    // Vérifier si `selectedMode` a changé
    if (changes["selectedMode"] && !changes["selectedMode"].firstChange) {
      this.currentPage = 1;
      this.fetchLeaderboardData();
    }
  }

  fetchLeaderboardData(): void {
    this.isLoading = true;
    let chosenPhase: string;
      const observer = {
        next: (response: any) => {
          this.leaderboardData = response;
          console.log('Données reçues :', this.leaderboardData);
          this.totalPages = Math.ceil(this.leaderboardData.length / this.pageSize);
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
      if (this.selectedMode === GameSettings.STREAMER_ROUND1 || this.selectedMode === GameSettings.STREAMER_ROUND2 || this.selectedMode === GameSettings.STREAMER_ROUND3) {
        switch (this.selectedMode) {
          case GameSettings.STREAMER_ROUND1:
            chosenPhase = ApiService.STREAMERS_ROUND1; break;
          case GameSettings.STREAMER_ROUND2:
            chosenPhase = ApiService.STREAMERS_ROUND2; break;
          case GameSettings.STREAMER_ROUND3:
            chosenPhase = ApiService.STREAMERS_ROUND3; break;
          default:
            chosenPhase = ApiService.STREAMERS_ROUND1;
        }
        this.apiService.getSmartLeaderboardByName(chosenPhase).subscribe(observer);
      } else {
        if (this.selectedMode === GameSettings.MODE_GLOBAL) {
            this.apiService.getGlobalLeaderboard().subscribe(observer);
        }
      }
    }

  paginateData(): void {
    this.paginatedData = this.paginationService.paginate(this.leaderboardData, this.pageSize, this.currentPage);
    if (this.selectedMode === GameSettings.MODE_GLOBAL) {
        this.getDetailedData();
    }
  }

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
    return time > 0 ? formatTimeWithMilliseconds(time) : '//';
  }

  getDetailedData(): void {
    this.paginatedData.forEach((item, index) => {
      // Appel API pour chaque élément paginé
      this.apiService.getBestTimeByUUID(item.uuid).subscribe({
        next: (details) => {
            this.paginatedData[index].phaseTimes = details;
          console.log(`Détails reçus pour l'élément ${item.id} :`, details);
        },
        error: (error) => {
          console.error(`Erreur lors de la récupération des détails pour l'élément ${item.id}:`, error);
        }
      });
    });
  }
  
    
}