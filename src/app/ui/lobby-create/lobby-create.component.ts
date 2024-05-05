import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateLobbyDto } from '../../models/lobby-create-dto.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-lobby-create',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './lobby-create.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyCreateComponent {
  @Input() games: { id: string, title: string }[] = [];
  @Output() onCreateLobby = new EventEmitter<CreateLobbyDto>();

  createLobbyModel: CreateLobbyDto = {
    bet: { currencyId: 1, amount: 0 },
    private: false,
    gameId: ""
  };

  public onCreateLobbyClick() {
    console.log(this.createLobbyModel);
    this.onCreateLobby.emit(this.createLobbyModel);
  }

  public getSelectedCurrencyText(selector: HTMLSelectElement): string {
    if (selector.selectedIndex === -1)
      return "";
    return selector.options[selector.selectedIndex].text;
  }
}
