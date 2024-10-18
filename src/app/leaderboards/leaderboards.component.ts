import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { LeaderboardsGlobalComponent } from "./leaderboards.global.component";
import { GameSettings } from "../model/game.settings";
import { LeaderboardsModeComponent } from "./leaderboards.mode.component";

@Component({
    selector: 'app-leaderboards-component',
    templateUrl: './leaderboards.component.html',
    imports: [RouterModule, NgFor, NgIf, NgTemplateOutlet, LeaderboardsGlobalComponent, LeaderboardsModeComponent],
    standalone: true,
})
export class LeaderboardsComponent {
  isDropdownOpen = false;
  modeGlobal = GameSettings.MODE_GLOBAL;
  modeJump = GameSettings.MODE_JUMP;
  modeDonjon = GameSettings.MODE_DONJON;
  modeHippodrome = GameSettings.MODE_HIPPODROME;
  modeBateau = GameSettings.MODE_BATEAU;
  modeElytra = GameSettings.MODE_ELYTRA;
  modeMinage = GameSettings.MODE_MINAGE;
  modeOneHeart = GameSettings.MODE_ONE_HEART;

  
  selectedMode = this.modeGlobal;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectMode(mode: string): void {
    this.selectedMode = mode;
    this.isDropdownOpen = false;
  }

  getAvailableModes(): string[] {
    return [
      this.modeGlobal,
      this.modeJump,
      this.modeDonjon,
      this.modeHippodrome,
      this.modeBateau,
      this.modeElytra,
      this.modeMinage,
      this.modeOneHeart
    ].filter(mode => mode !== this.selectedMode);
  }

  formatModeText(mode: string): string {
    if (mode === this.modeHippodrome) {
      return 'HIPPO-\nDROME'; // Ajoute un saut de ligne dans "HIPPO-DROME"
    } else if (mode === this.modeOneHeart) {
      return 'ONE\nHEART'; // Ajoute un saut de ligne entre "ONE" et "HEART"
    } else if (this.selectedMode === this.modeJump && mode === this.modeDonjon) {
      return 'DON-\nJON';
    }
    return mode; // Sinon, renvoie le texte tel quel
  }

}