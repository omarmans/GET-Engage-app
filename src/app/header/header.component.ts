import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeLinkIndex: number = 0;
  userEmail: string | null = null;
  isAuthenticated = false;

  // logged=
  // if(localStorage.getItem('logged'));
  setActiveLink(index: number): void {
    this.activeLinkIndex = index;
    const selectedLink = this.classesArray[index];
  
    if (selectedLink.href === 'logout') {
      this.logout();
    } else {
      this.activeLinkIndex = index;
    }
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
    {
      i: 'fa-solid fa-arrow-right-from-bracket',
      href: 'logout', 

    },
  ];

  constructor(private authService: AuthService, private router:Router,  private cdr: ChangeDetectorRef // 👈 إضافة ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
      this.updateMenu();
      this.cdr.detectChanges(); 
    });

    this.authService.isAuthenticated$.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
      this.cdr.detectChanges();
    });
  }

  updateMenu() {
    if (this.userEmail === 'burak@gmail.com') {
      this.classesArray = this.classesArray.map(link => 
        link.href === 'dashboard' ? { ...link, href: 'mer-dashboard' } : link
      );
      this.classesArray = this.classesArray.filter(link => link.href !== 'merchants');
    } else {
      if (!this.classesArray.find(link => link.href === 'merchants')) {
        this.classesArray.splice(1, 0, { i: 'fa fa-users', href: 'merchants' });
      }
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  
  // setActiveLink(index: number): void {
  //   const selectedLink = this.classesArray[index];
  
  //   if (selectedLink.href === 'logout') {
  //     this.logout();
  //   } else {
  //     this.activeLinkIndex = index;
  //   }
  // }
  
  
}
