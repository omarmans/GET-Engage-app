import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-assign-vousher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assign-vousher.component.html',
  styleUrl: './assign-vousher.component.scss',
})
export class AssignVousherComponent {
  @Input() showForm = false;
  @Output() closeForm = new EventEmitter<void>();
  close() {
    this.closeForm.emit();
  }
}
