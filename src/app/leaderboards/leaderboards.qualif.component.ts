import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { LeaderboardsGlobalComponent } from "./leaderboards.global.component";
import { GameSettings } from "../model/game.settings";
import { LeaderboardsTotalComponent } from "./leaderboards.total.component";

@Component({
    selector: 'app-leaderboards-qualif-component',
    templateUrl: './leaderboards.qualif.component.html',
    imports: [RouterModule, NgFor, NgIf, NgTemplateOutlet, LeaderboardsGlobalComponent, LeaderboardsTotalComponent],
    standalone: true,
})
export class LeaderboardsQualifComponent {
  isDropdownOpen = false;
  round1 = GameSettings.SAMEDI_1;
  round2 = GameSettings.SAMEDI_2;
  round3 = GameSettings.SAMEDI_3;
  round4 = GameSettings.SAMEDI_4;
  round5 = GameSettings.SAMEDI_5;
  round6 = GameSettings.SAMEDI_6;
  round7 = GameSettings.SAMEDI_7;

  
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
        this.round4,
        this.round5,
        this.round6,
        this.round7
    ].filter(mode => mode !== this.selectedMode);
  }

  getDropdownTitleName(mode: string): string {
    switch (mode) {
    case GameSettings.SAMEDI_1:
        return 'ROUND 1';
    case GameSettings.SAMEDI_2:
        return 'ROUND 2';
     case GameSettings.SAMEDI_3:
        return 'ROUND 3';
    case GameSettings.SAMEDI_4:
        return 'ROUND 4';
    case GameSettings.SAMEDI_5:
        return 'ROUND 5';
    case GameSettings.SAMEDI_6:
        return 'ROUND 6';
    case GameSettings.SAMEDI_7:
        return 'ROUND 7';
    default:
        return 'ROUND 1';
    }
}
}