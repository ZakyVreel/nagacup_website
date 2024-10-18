import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-twitch-stream',
  templateUrl: './twitch.stream.component.html',
  standalone: true
})
export class TwitchStreamComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Initialiser le stream Twitch après que la vue est chargée
    // new window.Twitch.Embed('twitch-embed', {
    //   width: '720',
    //   height: '480',
    //   channel: 'ton_nom_de_chaine', // Remplace par le nom de ta chaîne Twitch
    //   parent: ['localhost'] // Remplace par ton domaine en production
    // });
  }
}
