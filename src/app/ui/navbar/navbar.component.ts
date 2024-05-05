import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  @Input() isAuthenticated: boolean = false;

  @ViewChild("nav_burger") navBurger: ElementRef | undefined;
  @ViewChild("nav_menu") navMenu: ElementRef | undefined;

  public toggleNavbar() {
    this.navBurger?.nativeElement.classList.toggle('is-active');
    this.navMenu?.nativeElement.classList.toggle('is-active');
  }

  get currentUrl() {
    return window.location.href;
  }
}
