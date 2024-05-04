import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-item',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './profile-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``
})
export class ProfileItemComponent {
  @Input() user!: IProfile;
}
