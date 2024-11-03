import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { LeaderboardsGlobalComponent } from "./leaderboards.global.component";
import { GameSettings } from "../model/game.settings";
import { LeaderboardsTotalComponent } from "./leaderboards.total.component";

@Component({
    selector: 'app-leaderboards-finale-component',
    templateUrl: './leaderboards.finale.component.html',
    imports: [RouterModule, NgFor, NgIf, NgTemplateOutlet, LeaderboardsGlobalComponent, LeaderboardsTotalComponent],
    standalone: true,
})
export class LeaderboardsFinaleComponent {
  isDropdownOpen = false;
  elim = GameSettings.DIMANCHE_ELIM;
  round1 = GameSettings.DIMANCHE_1;
  round2 = GameSettings.DIMANCHE_2;
  round3 = GameSettings.DIMANCHE_3;
  round4 = GameSettings.DIMANCHE_4;
  total = GameSettings.DIMANCHE_TOTAL;

  
  selectedMode = this.elim;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectMode(mode: string): void {
    this.selectedMode = mode;
    this.isDropdownOpen = false;
  }

  getAvailableModes(): string[] {
    return [
        this.elim,
        this.round1,
        this.round2,
        this.round3,
        this.round4,
        this.total
    ].filter(mode => mode !== this.selectedMode);
  }

  getDropdownTitleName(mode: string): string {
    switch (mode) {
    case GameSettings.DIMANCHE_ELIM:
        return 'ÉLIMINATOIRE';
    case GameSettings.DIMANCHE_1:
        return 'ROUND 1';
    case GameSettings.DIMANCHE_2:
        return 'ROUND 2';
     case GameSettings.DIMANCHE_3:
        return 'ROUND 3';
        case GameSettings.DIMANCHE_4:
        return 'ROUND 4';
    case GameSettings.DIMANCHE_TOTAL:
        return 'TOTAL';
    default:
        return 'ROUND 1';
    }
}

  formatModeText(mode: string): string {
    switch (mode) {
        case GameSettings.DIMANCHE_ELIM:
            return 'ÉLIMI-\nNATOIRE';
        case GameSettings.DIMANCHE_1:
            return 'ROUND 1';
        case GameSettings.DIMANCHE_2:
            return 'ROUND 2';
         case GameSettings.DIMANCHE_3:
            return 'ROUND 3';
        case GameSettings.DIMANCHE_4:
            return 'ROUND 4';
        case GameSettings.DIMANCHE_TOTAL:
            return 'TOTAL';
        default:
            return 'ROUND 1';
        }
  }

}