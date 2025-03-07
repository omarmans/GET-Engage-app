import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MerchantService } from '../services/merchant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-merchant',
  standalone: true,
  imports: [HeaderTitleComponent, ReactiveFormsModule,CommonModule],
  providers: [FormBuilder, HttpClient],
    templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.scss',
})
export class AddMerchantComponent {
  
  
  addMerchant: FormGroup;
  selectedFile: File | null = null;
  picurl:string='';
  constructor(private fb: FormBuilder , private router:Router, private merchant:MerchantService) {
    this.addMerchant = this.fb.group({
      name: [''],
      description: [''],
      picURL: [this.picurl]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.picurl= this.selectedFile ? this.selectedFile.name : '' ;
    } else {
      alert('Please select a valid image file.');
    }
  }
  

  add() {
    if (this.addMerchant.invalid) {
      alert('Please fill all required fields.');
      return;
    }
  
    this.merchant.addmerchant(this.addMerchant.value).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        
        if (response.isSuccess) {
          alert('Merchant added successfully!');
          this.addMerchant.reset();
          this.selectedFile = null;
          this.router.navigate(['/merchants']);
        } else {
          const errorMessage = response.erorrs?.[0]?.message || 'Error adding merchant!';
          alert(errorMessage);
        }
      },
      error: (error) => {
        console.error('Error adding merchant', error);
        alert('Error adding merchant!');
      }
    });
  }
  
}  
