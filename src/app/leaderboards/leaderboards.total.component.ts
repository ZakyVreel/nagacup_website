import { Component, Input, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ApiService } from "../model/apiservice";
import { PaginationService } from "../model/pagination.service";
import { GameSettings } from "../model/game.settings";
import { formatTime } from "../model/utils";

@Component({
    selector: 'app-leaderboards-total-component',
    templateUrl: './leaderboards.total.component.html',
    imports: [RouterModule, NgFor, NgIf, NgClass],
    standalone: true,
})
export class LeaderboardsTotalComponent {
    @Input() selectedMode: string = '';
    leaderboardData: any[] = [];
    paginatedData: any[] = [];
    pageSize: number = 20;
    currentPage: number = 1;
    totalPages: number = 0;
    gameSettings = GameSettings;

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
          const observer = {
            next: (response: any) => {
              this.leaderboardData = response;
              console.log('Données reçues :', this.leaderboardData);
              this.totalPages = Math.ceil(this.leaderboardData.length / this.pageSize);
              this.paginateData();
            },
            error: (error: any) => {
              console.error('Erreur lors de la récupération des données :', error);
            },
            complete: () => {
              console.log('Appel API terminé');
            }
          };
          console.log(this.selectedMode);
          if (this.selectedMode === GameSettings.STREAMER_TOTAL) {
            this.apiService.getPointsStreamers().subscribe(observer);
          }
      }

      paginateData(): void {
        this.paginatedData = this.paginationService.paginate(this.leaderboardData, this.pageSize, this.currentPage);
        if (this.selectedMode === GameSettings.STREAMER_TOTAL) {
            this.getDetailedData();
        }
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

        getDetailedData(): void {
            const observer = {
                next: (response: any) => {
                  this.paginatedData = response;
                  console.log('Données reçues :', this.paginatedData);
                },
                error: (error: any) => {
                  console.error('Erreur lors de la récupération des données :', error);
                },
                complete: () => {
                  console.log('Appel API terminé');
                }
              };
              console.log(this.selectedMode);
              if (this.selectedMode === GameSettings.STREAMER_TOTAL) {
                this.apiService.getPlayersTotalDetails(this.paginatedData).subscribe(observer);
              }
          }
  

}