import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FontAwesomeModule],
  templateUrl: './root.component.html',
  styles: [],
})
export class AppComponent {
  title = 'windetta-angular';

  constructor(lib: FaIconLibrary) {
    lib.addIcons(faCoffee);
  }
}