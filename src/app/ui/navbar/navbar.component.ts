import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProfile } from '../../models/profile.model';
import { sha256 } from 'js-sha256';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  @Input() profile: IProfile | null | undefined;

  get isAuthenticated(): boolean {
    return this.profile !== undefined && this.profile !== null;
  }

  @ViewChild("nav_burger") navBurger: ElementRef | undefined;
  @ViewChild("nav_menu") navMenu: ElementRef | undefined;

  public toggleNavbar() {
    this.navBurger?.nativeElement.classList.toggle('is-active');
    this.navMenu?.nativeElement.classList.toggle('is-active');
  }

  get currentUrl() {
    return window.location.href;
  }

  get imageHash(): string | null {
    return this.profile === null || this.profile === undefined ? null : sha256(this.profile.email);
  }
}
