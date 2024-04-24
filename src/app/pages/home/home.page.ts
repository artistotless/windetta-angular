import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { from, mergeMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatchListComponent } from '../../ui/match-list/match-list.component';
import { LobbyListComponent } from '../../ui/lobby-list/lobby-list.component';
import { LobbyService } from '../../services/lobby.service';
import { Lobby } from '../../models/lobby.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, MatchListComponent, LobbyListComponent],
  templateUrl: './home.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

  public title: string = "Home";
  
  public lobbies: Array<Lobby> = [];
  
  constructor(private _lobbySevice: LobbyService) { }

  ngOnInit(): void {
    this._lobbySevice.getLobbies().pipe(
      mergeMap(items => from(items))
    ).subscribe((lobby) => this.lobbies.push(lobby));
  }
}