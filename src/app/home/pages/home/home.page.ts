import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../matches/services/match.service';
import { guid } from 'guid-factory';
import { MatchListComponent } from '../../../matches/ui/match-list/match-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatchListComponent],
  templateUrl: './home.page.html',
  styles: ``
})
export class HomePage implements OnInit {
  title: string = "Home";

  constructor(private _matches: MatchService) {
  }

  ngOnInit(): void {

    let matchesIds: guid[];

    this._matches.getOngoingMatchesIds().subscribe(
      (values: guid[]) => { matchesIds = values; }
    );
  }
}