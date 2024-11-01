import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { LeaderboardsGlobalComponent } from "./leaderboards.global.component";
import { GameSettings } from "../model/game.settings";
import { LeaderboardsTotalComponent } from "./leaderboards.total.component";

@Component({
    selector: 'app-leaderboards-scrim-component',
    templateUrl: './leaderboards.scrim.component.html',
    imports: [RouterModule, NgFor, NgIf, NgTemplateOutlet, LeaderboardsGlobalComponent, LeaderboardsTotalComponent],
    standalone: true,
})
export class LeaderboardsScrimComponent {
  isDropdownOpen = false;
  round1 = GameSettings.SCRIM2_1;
  round2 = GameSettings.SCRIM2_2;
  round3 = GameSettings.SCRIM2_3;

  
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
      this.round3
    ].filter(mode => mode !== this.selectedMode);
  }

  getDropdownTitleName(mode: string): string {
    switch (mode) {
      case GameSettings.SCRIM2_1:
        return 'ROUND 1';
    case GameSettings.SCRIM2_2:
        return 'ROUND 2';
     case GameSettings.SCRIM2_3:
        return 'ROUND 3';
    default:
        return 'ROUND 1';
    }
}
}