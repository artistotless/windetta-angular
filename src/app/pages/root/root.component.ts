import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity.service';
import { Profile } from '../../models/profile.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FontAwesomeModule, JsonPipe, AsyncPipe],
  templateUrl: './root.component.html',
  styles: [],
})
export class AppComponent implements OnInit {

  title = 'windetta-angular';

  constructor(lib: FaIconLibrary, private _identity: IdentityService) {
    lib.addIcons(faCoffee);
  }

  ngOnInit(): void {
    this._identity.authenticate().subscribe();
  }
}