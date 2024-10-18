import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ApiService } from "../model/apiservice";
import { forkJoin } from "rxjs";
import { formatTime } from "../model/utils";

@Component({
    selector: 'app-leaderboards-profile-component',
    templateUrl: './leaderboards.profile.component.html',
    imports: [RouterModule, NgFor, NgIf],
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

    constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private apiService: ApiService) {}

    ngOnInit(): void {
        // Récupère les paramètres de la route
        this.route.params.subscribe(params => {
          this.uuid = params['uuid'];
          this.username = params['username'];
          // Maintenant, tu peux utiliser l'UUID et le pseudo pour faire des appels API ou afficher les infos du joueur
          console.log('UUID:', this.uuid, 'Username:', this.username);
        });

        this.fetchLeaderboardData();
      }

      fetchLeaderboardData(): void {
        forkJoin({
            getGlobalTimesDetailed: this.apiService.getBestTimeByUUID(this.uuid),
            getGlobalRank: this.apiService.getRankByUUID(this.uuid),
            getJumpRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.JUMP),
            getDungeonRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.DUNGEON),
            getHippodromeRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.HIPPODROME),
            getBoatRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.BOAT_RACE),
            getElytraRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.ELYTRA),
            getMinageRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.MINAGE),
            getOneHeartRank: this.apiService.getPhaseRankByUUID(this.uuid, ApiService.ONE_HEART)
          }).subscribe({
            next: (response) => {
                this.phasesTimes = response.getGlobalTimesDetailed;

                this.globalTime = this.phasesTimes.JUMP + this.phasesTimes.DUNGEON + this.phasesTimes.BOAT_RACE + this.phasesTimes.HIPPODROME 
                + this.phasesTimes.ELYTRA + this.phasesTimes.MINAGE + this.phasesTimes.ONE_HEART;

              this.globalRank = response.getGlobalRank;

              this.jumpRank = response.getJumpRank;
                this.dungeonRank = response.getDungeonRank;
                this.hippodromeRank = response.getHippodromeRank;
                this.boatRank = response.getBoatRank;
                this.elytraRank = response.getElytraRank;
                this.minageRank = response.getMinageRank;
                this.oneHeartRank = response.getOneHeartRank;
            },
            error: (error) => {
              console.error('Erreur lors des appels API:', error);
            },
            complete: () => {
              console.log('Tous les appels API sont terminés');
            }
          });
    }

    getParentDomain(): string {
        console.log(window.location.hostname);
        return window.location.hostname;
    }

    sanitizeUrl(channel: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`);
    }

    getFormatTime(time: any) {
        return time > 0 ? formatTime(time) : '//';
      }
      getRank(rank: any) {
        return rank > 0 ? rank : 'NA';
      }
}