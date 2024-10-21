import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-leaderboards-menu-component',
    templateUrl: './leaderboards.menu.component.html',
    imports: [RouterModule, NgFor],
    standalone: true,
})
export class LeaderboardsMenuComponent {
}