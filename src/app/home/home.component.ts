import { NgIf } from "@angular/common";
import { Component, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    imports: [RouterOutlet, NgIf],
    standalone: true,
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
    isPopupVisible: boolean = false;
    videoTrailerUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {
        const videoId = 'xMeBKralo2o';
        this.videoTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
      }

    openPopup() : void {
        this.isPopupVisible = true;
    }

    closePopup() : void {
        this.isPopupVisible = false;
    }
}