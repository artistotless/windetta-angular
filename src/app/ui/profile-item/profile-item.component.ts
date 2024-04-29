import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './profile-item.component.html',
  styles: ``
})
export class ProfileItemComponent {
  @Input() user!: Profile;
}
