import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';

@Component({
  selector: 'app-add-merchant',
  standalone: true,
  imports: [HeaderTitleComponent],
  templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.scss',
})
export class AddMerchantComponent {}
