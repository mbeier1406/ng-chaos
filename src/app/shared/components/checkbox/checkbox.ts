import {Component, model, input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  // Model Signal für das two-way binding des Checkboxes
  checked = model.required<boolean>();
  // Optional input für den Label des Checkboxes
  label = input<string>('');

  toggle() {
    // Diese Methode aktualisiert den Zustand der Komponente und das Model des Parents (detail.ts)!
    this.checked.set(!this.checked());
  }

}
