import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ApiService } from "../model/apiservice";
import { catchError, forkJoin, of } from "rxjs";
import { formatTime, formatUUID } from "../model/utils";

@Component({
    selector: 'app-leaderboards-profile-component',
    templateUrl: './leaderboards.profile.component.html',
    imports: [RouterModule, NgFor, NgIf, NgClass],
    standalone: true,
})
export class LeaderboardsProfileComponent implements OnInit {
  uuid: string = '';
  username: string = '';
  globalTime: any = '//';
  globalRank: any = 'NA';
  phasesTimes: any = '//';
  phasesRanks: any = 'NA';

  jumpRank: any;
  dungeonRank: any;
  hippodromeRank: any;
  boatRank: any;
  elytraRank: any;
  minageRank: any;
  oneHeartRank: any;

  usernameFinal: string = ''

  isLoading: boolean = false;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private apiService: ApiService, private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.verifyMinecraftAccount();
    });
  }

  verifyMinecraftAccount() {
    this.isLoading = true;
    const observer = {
      next: (response: any) => {
        this.uuid = formatUUID(response.id);
        this.username = response.name;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des données  verifyMinecraftAccount:', error);
        this.isLoading = false;
        this.goBack();
      },
      complete: () => {
        this.fetchLeaderboardData();
        console.log('Appel API terminé');
      }
    };
    this.apiService.getUUIDByUsername(this.username).subscribe(observer);
  }


fetchLeaderboardData(): void {
  forkJoin({
      getGlobalTimesDetailed: this.apiService.getBestTimeByUUID(this.uuid).pipe(
          catchError(error => {
              console.error('Erreur getGlobalTimesDetailed:', error);
              return of(null); // ou une valeur par défaut
          })
      ),
      getGlobalRank: this.apiService.getRankByUUID(this.uuid).pipe(
          catchError(error => {
              console.error('Erreur getGlobalRank:', error);
              return of(null);
          })
      ),
      getJumpRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.JUMP).pipe(
          catchError(error => {
              console.error('Erreur getJumpRank:', error);
              return of(null);
          })
      ),
      getDungeonRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.DUNGEON).pipe(
          catchError(error => {
              console.error('Erreur getDungeonRank:', error);
              return of(null);
          })
      ),
      getHippodromeRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.HIPPODROME).pipe(
          catchError(error => {
              console.error('Erreur getHippodromeRank:', error);
              return of(null);
          })
      ),
      getBoatRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.BOAT_RACE).pipe(
          catchError(error => {
              console.error('Erreur getBoatRank:', error);
              return of(null);
          })
      ),
      getElytraRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.ELYTRA).pipe(
          catchError(error => {
              console.error('Erreur getElytraRank:', error);
              return of(null);
          })
      ),
      getMinageRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.MINAGE).pipe(
          catchError(error => {
              console.error('Erreur getMinageRank:', error);
              return of(null);
          })
      ),
      getOneHeartRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.ONE_HEART).pipe(
          catchError(error => {
              console.error('Erreur getOneHeartRank:', error);
              return of(null);
          })
      )
    }).subscribe({
      next: (response) => {
        this.phasesTimes = response.getGlobalTimesDetailed || {};  // Gérer la valeur nulle éventuelle

        // Vérification que toutes les valeurs sont valides avant de calculer le globalTime
        const validPhases = [
          this.phasesTimes.JUMP,
          this.phasesTimes.DUNGEON,
          this.phasesTimes.BOAT_RACE,
          this.phasesTimes.HIPPODROME,
          this.phasesTimes.ELYTRA,
          this.phasesTimes.MINAGE,
          this.phasesTimes.ONE_HEART
        ];
    
        // Si toutes les phases sont non nulles et >= 0, alors calculer le globalTime
        if (validPhases.every(time => time !== null && time !== undefined && time >= 0)) {
            this.globalTime = validPhases.reduce((acc, time) => acc + time, 0);
        } else {
            // S'il y a des valeurs incorrectes, ne pas calculer globalTime
            this.globalTime = -1; // Ou toute autre indication
        }
    
        // Autres données
        this.globalRank = response.getGlobalRank || 'NA';
        this.jumpRank = response.getJumpRank || 'NA';
        this.dungeonRank = response.getDungeonRank || 'NA';
        this.hippodromeRank = response.getHippodromeRank || 'NA';
        this.boatRank = response.getBoatRank || 'NA';
        this.elytraRank = response.getElytraRank || 'NA';
        this.minageRank = response.getMinageRank || 'NA';
        this.oneHeartRank = response.getOneHeartRank || 'NA';
      },
      error: (error) => {
        console.error('Erreur lors des appels API:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Tous les appels API sont terminés');
        this.isLoading = false;
      }
    });
  }

  getRankClass(rank: any): string {
    if (rank === 1) {
      return 'rank-gold'; // Classe pour le rang 1 (Or)
    } else if (rank === 2) {
      return 'rank-silver'; // Classe pour le rang 2 (Argent)
    } else if (rank === 3) {
      return 'rank-bronze'; // Classe pour le rang 3 (Bronze)
    } else if (rank > 3) {
      return 'rank-default'; // Classe par défaut pour les autres rangs
    }
    else {
      return 'rank-NA'
    }
  }

  getParentDomain(): string {
    return window.location.hostname;
  }

  sanitizeUrl(channel: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`);
  }

  getFormatTime(time: any) {
    return time > 0 ? formatTime(time) : '//';
  }

  getRank(rank: any) {
    return rank + 1 > 0 ? rank + 1 : 'NA';
  }

  goBack(): void {
    this.location.back();
  }
}