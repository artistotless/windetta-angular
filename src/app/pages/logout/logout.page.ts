import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutPage implements OnInit {

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let returnUrl = this._route.snapshot.queryParams["returnUrl"];
    console.log("Successfully loged out");
    window.location.href = `${environment.mvcUrl}/logout?returnUrl=${returnUrl}`
  }
}
