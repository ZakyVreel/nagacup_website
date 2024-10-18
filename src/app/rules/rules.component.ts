import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-rules-component',
    templateUrl: './rules.component.html',
    imports: [RouterOutlet, RouterModule],
    standalone: true,
})
export class RulesComponent {

}