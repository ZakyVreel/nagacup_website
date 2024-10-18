import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { LeaderboardsGlobalComponent } from "./leaderboards.global.component";
import { GameSettings } from "../model/game.settings";
import { LeaderboardsTotalComponent } from "./leaderboards.total.component";

@Component({
    selector: 'app-leaderboards-streamer-component',
    templateUrl: './leaderboards.streamer.component.html',
    imports: [RouterModule, NgFor, NgIf, NgTemplateOutlet, LeaderboardsGlobalComponent, LeaderboardsTotalComponent],
    standalone: true,
})
export class LeaderboardsStreamerComponent {
  isDropdownOpen = false;
  round1 = GameSettings.STREAMER_ROUND1;
  round2 = GameSettings.STREAMER_ROUND2;
  round3 = GameSettings.STREAMER_ROUND3;
  total = GameSettings.STREAMER_TOTAL;

  
  selectedMode = this.round1;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectMode(mode: string): void {
    this.selectedMode = mode;
    this.isDropdownOpen = false;
  }

  getAvailableModes(): string[] {
    return [
      this.round1,
      this.round2,
      this.round3,
      this.total
    ].filter(mode => mode !== this.selectedMode);
  }

  getDropdownTitleName(mode: string): string {
    switch (mode) {
      case GameSettings.STREAMER_ROUND1:
        return 'ROUND 1';
    case GameSettings.STREAMER_ROUND2:
        return 'ROUND 2';
     case GameSettings.STREAMER_ROUND3:
        return 'ROUND 3';
    case GameSettings.STREAMER_TOTAL:
        return 'TOTAL';
    default:
        return 'ROUND 1';
    }
}

//   formatModeText(mode: string): string {
//     if (mode === this.modeHippodrome) {
//       return 'HIPPO-\nDROME'; // Ajoute un saut de ligne dans "HIPPO-DROME"
//     } else if (mode === this.modeOneHeart) {
//       return 'ONE\nHEART'; // Ajoute un saut de ligne entre "ONE" et "HEART"
//     } else if (this.selectedMode === this.modeJump && mode === this.modeDonjon) {
//       return 'DON-\nJON';
//     }
//     return mode; // Sinon, renvoie le texte tel quel
//   }

}