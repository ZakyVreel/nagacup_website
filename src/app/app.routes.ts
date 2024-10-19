import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { LeaderboardsMenuComponent } from './leaderboards/leaderboards.menu.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { LeaderboardsStreamerComponent } from './leaderboards/leaderboards.streamer.component';
import { LeaderboardsProfileComponent } from './leaderboards/leaderboards.profile.component';
import { RulesEventsComponent } from './rules/rules.events.component';
import { RulesCompetitionsComponent } from './rules/rules.competitions.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'leaderboards', component: LeaderboardsMenuComponent },
    { path: 'leaderboards/global', component: LeaderboardsComponent },
    { path: 'leaderboards/streamer', component: LeaderboardsStreamerComponent },
    {
      path: 'rules',
      component: RulesComponent,
      children: [
        { path: 'competitions', component: RulesCompetitionsComponent },
        { path: 'events', component: RulesEventsComponent },
        { path: '', redirectTo: 'competitions', pathMatch: 'full' },
      ]
    },
    { path: 'leaderboards/profile/:uuid/:username', component: LeaderboardsProfileComponent },
    { path: '**', redirectTo: 'home' },
  ];
