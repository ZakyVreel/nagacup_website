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
  samediRounds = null;
  gameSettings = GameSettings;
  playersMock = [
    {
        username: "akbh",
        uuid: "d93d53f5-b7bd-4fdc-970d-67a772936c81",
        phaseTimes: {
            JUMP: 95556,
            DUNGEON: 220316,
            HIPPODROME: 131957,
            BOAT_RACE: 98546,
            ELYTRA: 55464,
            MINAGE: 38883,
            ONE_HEART: 108401
        },
        totalTime: 749123,
        completedPhases: 7,
        currentTotalTime: 749123
    },
    {
        username: "waaally",
        uuid: "14c81c94-63ab-4384-8001-1764b9633b24",
        phaseTimes: {
            JUMP: 100359,
            DUNGEON: 219678,
            HIPPODROME: 121733,
            BOAT_RACE: 104944,
            ELYTRA: 66257,
            MINAGE: 50881,
            ONE_HEART: 111374
        },
        totalTime: 775226,
        completedPhases: 7,
        currentTotalTime: 775226
    },
    {
        username: "clemalb_",
        uuid: "cbe653a4-29bf-4d8b-8eb2-af9c66fa19d8",
        phaseTimes: {
            JUMP: 109414,
            DUNGEON: 210841,
            HIPPODROME: 122586,
            BOAT_RACE: 99492,
            ELYTRA: 55816,
            MINAGE: 63466,
            ONE_HEART: 133978
        },
        totalTime: 795593,
        completedPhases: 7,
        currentTotalTime: 795593
    },
    {
        username: "bykraytox",
        uuid: "830c4e76-fbf6-4ed3-838a-10ede253dfa6",
        phaseTimes: {
            JUMP: 105497,
            DUNGEON: 218935,
            HIPPODROME: 129089,
            BOAT_RACE: 111986,
            ELYTRA: 79898,
            MINAGE: 48563,
            ONE_HEART: 106872
        },
        totalTime: 800840,
        completedPhases: 7,
        currentTotalTime: 800840
    },
    {
        username: "nathook",
        uuid: "49afcc0c-0ea7-4201-949d-73da55c77ae8",
        phaseTimes: {
            JUMP: 118937,
            DUNGEON: 218991,
            HIPPODROME: 149273,
            BOAT_RACE: 103538,
            ELYTRA: 55881,
            MINAGE: 46229,
            ONE_HEART: 112544
        },
        totalTime: 805393,
        completedPhases: 7,
        currentTotalTime: 805393
    },
    {
        username: "gaake_",
        uuid: "befe320b-1ac1-410b-968d-72c540c1f859",
        phaseTimes: {
            JUMP: 108654,
            DUNGEON: 247878,
            HIPPODROME: 124488,
            BOAT_RACE: 112969,
            ELYTRA: 55713,
            MINAGE: 48337,
            ONE_HEART: 109703
        },
        totalTime: 807742,
        completedPhases: 7,
        currentTotalTime: 807742
    },
    {
        username: "tatiaus",
        uuid: "d8f7f0fc-5cdb-462b-a139-ca10cd336d2c",
        phaseTimes: {
            JUMP: 113614,
            DUNGEON: 249897,
            HIPPODROME: 120947,
            BOAT_RACE: 100696,
            ELYTRA: 76377,
            MINAGE: 50556,
            ONE_HEART: 109862
        },
        totalTime: 821949,
        completedPhases: 7,
        currentTotalTime: 821949
    },
    {
        username: "romaincha",
        uuid: "dbbb83c4-8d93-4182-900d-53aa45c8307c",
        phaseTimes: {
            JUMP: 124852,
            DUNGEON: 227897,
            HIPPODROME: 129317,
            BOAT_RACE: 116948,
            ELYTRA: 60138,
            MINAGE: 51294,
            ONE_HEART: 112579
        },
        totalTime: 823025,
        completedPhases: 7,
        currentTotalTime: 823025
    },
    {
        username: "eallyos",
        uuid: "6f98b3f3-38ea-43a7-b113-93395fbaee3f",
        phaseTimes: {
            JUMP: 117615,
            DUNGEON: 233606,
            HIPPODROME: 132847,
            BOAT_RACE: 104645,
            ELYTRA: 89004,
            MINAGE: 40910,
            ONE_HEART: 107183
        },
        totalTime: 825810,
        completedPhases: 7,
        currentTotalTime: 825810
    },
    {
        username: "doonko",
        uuid: "12b31d45-5418-49f9-ae28-b9d44966c7bf",
        phaseTimes: {
            JUMP: 128792,
            DUNGEON: 245146,
            HIPPODROME: 135135,
            BOAT_RACE: 114193,
            ELYTRA: 54977,
            MINAGE: 42787,
            ONE_HEART: 134851
        },
        totalTime: 855881,
        completedPhases: 7,
        currentTotalTime: 855881
    },
    {
      username: "nathook",
      uuid: "49afcc0c-0ea7-4201-949d-73da55c77ae8",
      phaseTimes: {
          JUMP: 118937,
          DUNGEON: 218991,
          HIPPODROME: 149273,
          BOAT_RACE: 103538,
          ELYTRA: 55881,
          MINAGE: 46229,
          ONE_HEART: 112544
      },
      totalTime: 805393,
      completedPhases: 7,
      currentTotalTime: 805393
  },
  {
      username: "gaake_",
      uuid: "befe320b-1ac1-410b-968d-72c540c1f859",
      phaseTimes: {
          JUMP: 108654,
          DUNGEON: 247878,
          HIPPODROME: 124488,
          BOAT_RACE: 112969,
          ELYTRA: 55713,
          MINAGE: 48337,
          ONE_HEART: 109703
      },
      totalTime: 807742,
      completedPhases: 7,
      currentTotalTime: 807742
  },
  {
      username: "tatiaus",
      uuid: "d8f7f0fc-5cdb-462b-a139-ca10cd336d2c",
      phaseTimes: {
          JUMP: 113614,
          DUNGEON: 249897,
          HIPPODROME: 120947,
          BOAT_RACE: 100696,
          ELYTRA: 76377,
          MINAGE: 50556,
          ONE_HEART: 109862
      },
      totalTime: 821949,
      completedPhases: 7,
      currentTotalTime: 821949
  },
  {
      username: "romaincha",
      uuid: "dbbb83c4-8d93-4182-900d-53aa45c8307c",
      phaseTimes: {
          JUMP: 124852,
          DUNGEON: 227897,
          HIPPODROME: 129317,
          BOAT_RACE: 116948,
          ELYTRA: 60138,
          MINAGE: 51294,
          ONE_HEART: 112579
      },
      totalTime: 823025,
      completedPhases: 7,
      currentTotalTime: 823025
  },
  {
      username: "eallyos",
      uuid: "6f98b3f3-38ea-43a7-b113-93395fbaee3f",
      phaseTimes: {
          JUMP: 117615,
          DUNGEON: 233606,
          HIPPODROME: 132847,
          BOAT_RACE: 104645,
          ELYTRA: 89004,
          MINAGE: 40910,
          ONE_HEART: 107183
      },
      totalTime: 825810,
      completedPhases: 7,
      currentTotalTime: 825810
  },
  {
      username: "doonko",
      uuid: "12b31d45-5418-49f9-ae28-b9d44966c7bf",
      phaseTimes: {
          JUMP: 128792,
          DUNGEON: 245146,
          HIPPODROME: 135135,
          BOAT_RACE: 114193,
          ELYTRA: 54977,
          MINAGE: 42787,
          ONE_HEART: 134851
      },
      totalTime: 855881,
      completedPhases: 7,
      currentTotalTime: 855881
  },
  {
    username: "romaincha",
    uuid: "dbbb83c4-8d93-4182-900d-53aa45c8307c",
    phaseTimes: {
        JUMP: 124852,
        DUNGEON: 227897,
        HIPPODROME: 129317,
        BOAT_RACE: 116948,
        ELYTRA: 60138,
        MINAGE: 51294,
        ONE_HEART: 112579
    },
    totalTime: 823025,
    completedPhases: 7,
    currentTotalTime: 823025
},
{
    username: "eallyos",
    uuid: "6f98b3f3-38ea-43a7-b113-93395fbaee3f",
    phaseTimes: {
        JUMP: 117615,
        DUNGEON: 233606,
        HIPPODROME: 132847,
        BOAT_RACE: 104645,
        ELYTRA: 89004,
        MINAGE: 40910,
        ONE_HEART: 107183
    },
    totalTime: 825810,
    completedPhases: 7,
    currentTotalTime: 825810
},
{
    username: "doonko",
    uuid: "12b31d45-5418-49f9-ae28-b9d44966c7bf",
    phaseTimes: {
        JUMP: 128792,
        DUNGEON: 245146,
        HIPPODROME: 135135,
        BOAT_RACE: 114193,
        ELYTRA: 54977,
        MINAGE: 42787,
        ONE_HEART: 134851
    },
    totalTime: 855881,
    completedPhases: 7,
    currentTotalTime: 855881
}
];


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
          //this.leaderboardData = this.playersMock;
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
      if (this.selectedMode === GameSettings.MODE_GLOBAL) {
        this.apiService.getGlobalLeaderboard().subscribe(observer);
      } else {
        switch (this.selectedMode) {
          case GameSettings.STREAMER_ROUND1:
            chosenPhase = ApiService.STREAMERS_ROUND1; break;
          case GameSettings.STREAMER_ROUND2:
            chosenPhase = ApiService.STREAMERS_ROUND2; break;
          case GameSettings.STREAMER_ROUND3:
            chosenPhase = ApiService.STREAMERS_ROUND3; break;
          case GameSettings.SCRIM2_1:
            chosenPhase = ApiService.SCRIM2_1; break;
          case GameSettings.SCRIM2_2:
            chosenPhase = ApiService.SCRIM2_2; break;
          case GameSettings.SCRIM2_3:
            chosenPhase = ApiService.SCRIM2_3; break;
          case GameSettings.SAMEDI_1:
          case GameSettings.SAMEDI_2:
          case GameSettings.SAMEDI_3:
          case GameSettings.SAMEDI_4:
          case GameSettings.SAMEDI_5:
          case GameSettings.SAMEDI_6:
          case GameSettings.SAMEDI_7:
            const observerSamedi = {
              next: (response: any) => {
                this.samediRounds = response;
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
            this.apiService.getSamediRounds().subscribe(observerSamedi);
            chosenPhase = this.selectedMode;
            break;
          default:
            chosenPhase = ApiService.STREAMERS_ROUND1;
        }
        this.apiService.getSmartLeaderboardByName(chosenPhase).subscribe(observer);
      }
    }

  paginateData(): void {
    this.paginatedData = this.paginationService.paginate(this.leaderboardData, this.pageSize, this.currentPage);
    if (this.selectedMode === GameSettings.MODE_GLOBAL) {
        this.getDetailedData();
    }

    if (this.isSamediMode()) {
      this.paginatedData = this.paginatedData.filter((element) => this.isNotListed(element.uuid));
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

  getSamediRoundLimit(): number {
    const roundNumber = parseInt(this.selectedMode.split("-")[1], 10);
    return this.samediRounds ? this.samediRounds[0][`round${roundNumber}`] : 0;
  }

  isSamediMode(): boolean {
    return this.selectedMode.startsWith("samedi-");
  }

  isGreen(item: any): boolean {
    const i = this.leaderboardData.indexOf(item);
    return this.isSamediMode() && i < this.leaderboardData.length - this.getSamediRoundLimit();
  }

  isRed(item: any): boolean {
    const i = this.leaderboardData.indexOf(item);
    return this.isSamediMode() && i >= this.leaderboardData.length - this.getSamediRoundLimit();
  }

  isNotListed(uuid: any): boolean {
    return uuid !== "264b9f5d-3791-4285-bb8d-e40a85ddcb08";
  }
    
    
}