import { Component } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-rules-events-component',
    templateUrl: './rules.events.component.html',
    imports: [RouterOutlet, RouterModule],
    standalone: true,
})
export class RulesEventsComponent {
    videoJumpUrl: SafeResourceUrl;
    videoDonjonUrl: SafeResourceUrl;
    videoHippoUrl: SafeResourceUrl;
    videoBoatUrl: SafeResourceUrl;
    videoElytraUrl: SafeResourceUrl;
    videoMinageUrl: SafeResourceUrl;
    videoOneHeartUrl: SafeResourceUrl;

    jumpUrl: string = 'QE3VYyuggSs';
    donjonUrl: string = '-ME2jlEBr2U';
    hippoUrl: string = 'xW5HiHsv0cU';
    boatUrl: string = '51oMVms-3fo';
    elytraUrl: string = 'emv2Jf_PwTk';
    minageUrl: string = 'zuSdOUxMrZ0';
    oneHeartUrl: string = '8wKlxDhUO9Q';

    constructor(private sanitizer: DomSanitizer) {
        this.videoJumpUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.jumpUrl}`);
        this.videoDonjonUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.donjonUrl}`);
        this.videoHippoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.hippoUrl}`);
        this.videoBoatUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.boatUrl}`);
        this.videoElytraUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.elytraUrl}`);
        this.videoMinageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.minageUrl}`);
        this.videoOneHeartUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.oneHeartUrl}`);
      }

      scrollToNext(nextSectionId: string) {
        const nextSection = document.querySelector(nextSectionId);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}