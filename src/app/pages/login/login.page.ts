import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let returnUrl = this._route.snapshot.queryParams["returnUrl"];
    window.location.href = `${environment.mvcUrl}/login?returnUrl=${returnUrl}`
  }
}
