import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NavbarComponent, RouterModule, FooterComponent]
})
export class AppComponent {
}