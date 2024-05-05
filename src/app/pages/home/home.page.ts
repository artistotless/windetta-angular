import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

}