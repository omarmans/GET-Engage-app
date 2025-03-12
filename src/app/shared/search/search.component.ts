import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {

  @Input() text:string='';

  @Output() searchTextChanged = new EventEmitter<string>();
  
  onSearchChange() {
    this.searchTextChanged.emit(this.text);
  }
  
}
