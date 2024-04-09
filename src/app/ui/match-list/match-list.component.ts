import { Component, Input } from '@angular/core';
import { OngoingMatch } from '../../models/match-info.model';
import { MatchItemComponent } from "../match-item/match-item.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-match-list',
  standalone: true,
  templateUrl: './match-list.component.html',
  styles: ``,
  imports: [MatchItemComponent, NgIf]
})
export class MatchListComponent {
  @Input() matches: Array<OngoingMatch> = [];
}