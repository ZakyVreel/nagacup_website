import { Component, Input, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ApiService } from "../model/apiservice";
import { PaginationService } from "../model/pagination.service";
import { GameSettings } from "../model/game.settings";
import { formatTime } from "../model/utils";
import { forkJoin } from "rxjs";

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

    isLoading: boolean = false;

    DIMANCHE_1 = [
      { username: "akbh", uuid: "d93d53f5-b7bd-4fdc-970d-67a772936c81", time: 781194 },
      { username: "eallyos", uuid: "6f98b3f3-38ea-43a7-b113-93395fbaee3f", time: 785684 },
      { username: "clemalb_", uuid: "cbe653a4-29bf-4d8b-8eb2-af9c66fa19d8", time: 810600 },
      { username: "bykraytox", uuid: "830c4e76-fbf6-4ed3-838a-10ede253dfa6", time: 815770 },
      { username: "waaally", uuid: "14c81c94-63ab-4384-8001-1764b9633b24", time: 818233 },
      { username: "shidauw", uuid: "85ffd88e-93c3-442e-b086-edd1da20cb02", time: 821601 },
      { username: "nathook", uuid: "49afcc0c-0ea7-4201-949d-73da55c77ae8", time: 828169 },
      { username: "hydrys34", uuid: "104606b1-01e1-4cd4-8311-2314339343c7", time: 834340 }
    ];
    
    DIMANCHE_2 = [
      { username: "shidauw", uuid: "85ffd88e-93c3-442e-b086-edd1da20cb02", time: 780000 },
      { username: "nol760", uuid: "26efa306-796d-4de5-b3c6-aca83f22d7ab", time: 782000 },
      { username: "eallyos", uuid: "6f98b3f3-38ea-43a7-b113-93395fbaee3f", time: 785000 },
      { username: "clemalb_", uuid: "cbe653a4-29bf-4d8b-8eb2-af9c66fa19d8", time: 790000 },
      { username: "waaally", uuid: "14c81c94-63ab-4384-8001-1764b9633b24", time: 795000 },
      { username: "akbh", uuid: "d93d53f5-b7bd-4fdc-970d-67a772936c81", time: 800000 },
      { username: "gerardlopez", uuid: "46728840-d4e0-4870-ae1d-7da72a993e56", time: 805000 },
      { username: "hydrys34", uuid: "104606b1-01e1-4cd4-8311-2314339343c7", time: 810000 }
    ];
    
    DIMANCHE_3 = [
      { username: "bykraytox", uuid: "830c4e76-fbf6-4ed3-838a-10ede253dfa6", time: 770000 },
      { username: "nol760", uuid: "26efa306-796d-4de5-b3c6-aca83f22d7ab", time: 772000 },
      { username: "sheepmxn", uuid: "aeff396d-f9d2-4eef-b5a3-3506f93ec66e", time: 775000 },
      { username: "gaake_", uuid: "befe320b-1ac1-410b-968d-72c540c1f859", time: 778000 },
      { username: "romaincha", uuid: "dbbb83c4-8d93-4182-900d-53aa45c8307c", time: 780000 },
      { username: "waaally", uuid: "14c81c94-63ab-4384-8001-1764b9633b24", time: 785000 },
      { username: "eallyos", uuid: "6f98b3f3-38ea-43a7-b113-93395fbaee3f", time: 790000 },
      { username: "clemalb_", uuid: "cbe653a4-29bf-4d8b-8eb2-af9c66fa19d8", time: 795000 }
    ];

    DIMANCHE_4 = [
      { username: "bykraytox", uuid: "830c4e76-fbf6-4ed3-838a-10ede253dfa6", time: 770000 },
      { username: "nol760", uuid: "26efa306-796d-4de5-b3c6-aca83f22d7ab", time: 772000 },
      { username: "sheepmxn", uuid: "aeff396d-f9d2-4eef-b5a3-3506f93ec66e", time: 775000 },
      { username: "gaake_", uuid: "befe320b-1ac1-410b-968d-72c540c1f859", time: 778000 },
      { username: "romaincha", uuid: "dbbb83c4-8d93-4182-900d-53aa45c8307c", time: 780000 },
      { username: "waaally", uuid: "14c81c94-63ab-4384-8001-1764b9633b24", time: 785000 },
      { username: "eallyos", uuid: "6f98b3f3-38ea-43a7-b113-93395fbaee3f", time: 790000 },
      { username: "clemalb_", uuid: "cbe653a4-29bf-4d8b-8eb2-af9c66fa19d8", time: 795000 }
    ];


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
      if (this.selectedMode === GameSettings.STREAMER_TOTAL) {
        this.isLoading = true;
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
        this.apiService.getPointsStreamers().subscribe(observer);
      }
      if (this.selectedMode === GameSettings.DIMANCHE_TOTAL) {
        this.isLoading = true;
    
        forkJoin([
          this.apiService.getSmartLeaderboardByName(ApiService.DIMANCHE_1),
          this.apiService.getSmartLeaderboardByName(ApiService.DIMANCHE_2),
          this.apiService.getSmartLeaderboardByName(ApiService.DIMANCHE_3),
          this.apiService.getSmartLeaderboardByName(ApiService.DIMANCHE_4)
        ]).subscribe({
          next: ([run1Data, run2Data, run3Data, run4Data]: [any[], any[], any[], any[]]) => {
            const playerPointsMap = new Map<string, any>();

            // run1Data = this.DIMANCHE_1;
            // run2Data = this.DIMANCHE_2;
            // run3Data = this.DIMANCHE_3;
            // run4Data = this.DIMANCHE_4;
    
            const calculatePoints = (runData: any[], roundKey: string) => {
              const totalPlayers = runData.length;
              runData.forEach((player, index) => {
                const points = totalPlayers - index;
                if (!playerPointsMap.has(player.username)) {
                  playerPointsMap.set(player.username, {
                    username: player.username,
                    [roundKey]: points,
                    points: points
                  });
                } else {
                  const playerData = playerPointsMap.get(player.username);
                  playerData[roundKey] = points;
                  playerData.points += points;
                }
              });
            };
    
            calculatePoints(run1Data, 'round1');
            calculatePoints(run2Data, 'round2');
            calculatePoints(run3Data, 'round3');
            calculatePoints(run4Data, 'round4');
    
            this.leaderboardData = Array.from(playerPointsMap.values()).sort(
              (a, b) => b.points - a.points
            );
    
            console.log('Classement global :', this.leaderboardData);
    
            // Pagination
            this.totalPages = Math.ceil(this.leaderboardData.length / this.pageSize);
            this.paginateData();
          },
          error: (error: any) => {
            console.error('Erreur lors de la récupération des données :', error);
            this.isLoading = false;
          },
          complete: () => {
            console.log('Appels API terminés');
            this.isLoading = false;
          }
        });
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
              if (this.selectedMode === GameSettings.STREAMER_TOTAL) {
                this.apiService.getPlayersTotalDetails(this.paginatedData).subscribe(observer);
              }
          }

          getPoints(points: any) {
            return points && points > 0 ? points : 'NA';
          }
  

}