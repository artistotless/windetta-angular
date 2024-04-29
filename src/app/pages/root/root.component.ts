import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { IdentityService } from '../../services/identity.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FontAwesomeModule, JsonPipe, AsyncPipe],
  templateUrl: './root.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  title = "Windetta";

  private authSubscription!: Subscription;

  constructor(lib: FaIconLibrary, private _identity: IdentityService) {
    lib.addIcons(faCoffee);
  }

  ngOnInit(): void {
    this.authSubscription = this._identity.authenticate().subscribe();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}