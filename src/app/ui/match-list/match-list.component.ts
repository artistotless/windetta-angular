import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatchItemComponent } from "../match-item/match-item.component";
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-match-list',
  standalone: true,
  templateUrl: './match-list.component.html',
  styles: ``,
  imports: [MatchItemComponent, NgIf, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchListComponent {
  @Input() matches: string[] | null = [];
}