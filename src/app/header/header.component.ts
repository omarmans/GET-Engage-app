import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeLinkIndex: number = 0;
  setActiveLink(index: number): void {
    this.activeLinkIndex = index;
  }
  classesArray = [
    {
      i: 'fa fa-home',

      href: 'dashboard',
    },
    {
      i: 'fa fa-users',

      href: 'merchants',
    },
    {
      i: 'fa-solid fa-cart-shopping',

      href: 'vouchers',
    },
  ];
}
