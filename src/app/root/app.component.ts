import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  template: `<router-outlet />`,
  styles: [],
})
export class AppComponent {
  title = 'windetta-angular';

  constructor(lib: FaIconLibrary) {
    lib.addIcons(faCoffee);
  }
}