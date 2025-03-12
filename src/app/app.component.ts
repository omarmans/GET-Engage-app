import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { HeaderComponent } from './header/header.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'GET-Engage-app';
  constructor(private tost:ToastrService)
  {}

  testTOS(){
    this.tost.success("hala")
  }
}
