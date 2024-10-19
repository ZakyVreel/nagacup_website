import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [RouterModule, NgIf, NgClass, FormsModule]
})
export class FooterComponent {

}