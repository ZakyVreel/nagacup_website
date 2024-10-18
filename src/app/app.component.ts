import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NavbarComponent, RouterModule]
})
export class AppComponent {
}