import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileItemComponent } from '../../ui/profile-item/profile-item.component';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, ProfileItemComponent],
  templateUrl: './home.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  constructor(public identity: IdentityService) {
  }

}