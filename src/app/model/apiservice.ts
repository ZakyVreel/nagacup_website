import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.nagacup.fr';

  static readonly JUMP = 'JUMP';
  static readonly DUNGEON = 'DUNGEON';
  static readonly HIPPODROME = 'HIPPODROME';
  static readonly BOAT_RACE = 'BOAT_RACE';
  static readonly ELYTRA = 'ELYTRA';
  static readonly MINAGE = 'MINAGE';
  static readonly ONE_HEART = 'ONE_HEART';

  static readonly STREAMERS_ROUND1 = 'round1';
  static readonly STREAMERS_ROUND2 = 'round2';
  static readonly STREAMERS_ROUND3 = 'round3';


  //temps en ms

  constructor(private http: HttpClient) {}

  //{"username":"dandan2611","uuid":"7fd2fd2c-b6d7-4ddf-b642-6c329296adf8"}
  getPlayers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/players`);
  }

  //if no data -1
  //{"JUMP":-1,"DUNGEON":-1,"HIPPODROME":-1,"BOAT_RACE":-1,"ELYTRA":-1,"MINAGE":-1,"ONE_HEART":-1}

  //{"JUMP":133977,"DUNGEON":401299,"HIPPODROME":213745,"BOAT_RACE":202200,"ELYTRA":85943,"MINAGE":56567,"ONE_HEART":247181}
  //détails de la meilleure run globale
    getBestTimeByUUID(uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/players/${uuid}/runs/best`);
    //les additionner pour résultats
  }

  //if no data -1
  //{"rank":8}
  getRankByUUID(uuid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/players/${uuid}/runs/rank`);
  }

  //if no data -1
  // {"rank":2}
  //ON-GOING dandan ajt temps
  getPhaseRankByUUID(uuid: string, phase: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/players/${uuid}/phase/${phase}/rank`);
  }

  getGlobalLeaderboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard/global`);
  }

  getPhaseLeaderboardByPhase(phase: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard/phase/${phase}`);
  }

  getGlobalLeaderboardByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard/named/${name}/global`);
  }

  getPhaseLeaderboardByNameAndPhase(name: string, phase: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard/named/${name}/phase/${phase}`);
  }

  getSmartLeaderboardByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard/named/${name}/smart`);
  }

  getLeaderboardByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard/named/${name}/global`);
  }

  getPointsStreamers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/leaderboard/points`);
  }

    getPlayersTotalDetails(players: any): Observable<any> {
        return forkJoin({
            round1: this.getLeaderboardByName(ApiService.STREAMERS_ROUND1),
            round2: this.getLeaderboardByName(ApiService.STREAMERS_ROUND2),
            round3: this.getLeaderboardByName(ApiService.STREAMERS_ROUND3)
        }).pipe(
            map(({ round1, round2, round3 }) => {
            // Ajouter la position dans chaque round pour chaque joueur
            return players.map((player: any) => {
                const round1Points = this.getPointsByPositon(this.getPlayerPosition(player.uuid, round1));
                const round2Points = this.getPointsByPositon(this.getPlayerPosition(player.uuid, round2));
                const round3Points = this.getPointsByPositon(this.getPlayerPosition(player.uuid, round3));

                return {
                ...player,
                round1: round1Points,
                round2: round2Points,
                round3: round3Points
                };
            });
            })
        );
    }

    // Fonction pour trouver la position d'un joueur dans un round
    getPlayerPosition(uuid: string, leaderboard: any[]): number {
        const index = leaderboard.findIndex(player => player.uuid === uuid);
        return index !== -1 ? index + 1 : -1;
    }

    getPointsByPositon(pos: any) {
      if (pos === 1) {
        return 1;
      } else if (pos >= 2 && pos <= 3) {
        return 2;
      } else if (pos >= 4 && pos <= 6) {
        return 3;
      } else if (pos >= 7 && pos <= 10) {
        return 4;
      } else if (pos >= 11 && pos <= 15) {
        return 5;
      } else if (pos >= 16 && pos <= 20) {
        return 6;
      } else if (pos >= 21 && pos <= 25) {
        return 7;
      } else if (pos >= 26 && pos <= 30) {
        return 8;
      } else if (pos >= 31 && pos <= 35) {
        return 9;
      } else if (pos >= 36 && pos <= 40) {
        return 10;
      } else if (pos >= 41) {
        return 11;
      }
    
      return -1;
    }


    // {
    //   "id": "4566e69fc90748ee8d71d7ba5aa00d20",
    //   "name": "playername"
    // }
    getUUIDByUsername(username: any): Observable<any> {
      return this.http.get(`/mojang-api/users/profiles/minecraft/${username}`);
     // return this.http.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    }

  //   [
  //     {"name": "OldName"},
  //     {"name": "NewName"}
  // ]
    getUsernameByUUID(uuid: any): Observable<any> {
      return this.http.get(`/mojang-ap/users/profiles/${uuid}/names`);
      //return this.http.get(`https://api.mojang.com/users/profiles/${uuid}/names`);
    }



}
