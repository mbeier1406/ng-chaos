import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

/**
 * Root-Component der Anwendung
 * 
 * @description
 * Die Haupt-Component, die als Einstiegspunkt der Angular-Anwendung dient.
 * Enthält die Router-Konfiguration und den Anwendungstitel.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * Der Titel der Anwendung
   * @default 'Chaos'
   */
  protected readonly title = signal('Chaos');
  protected readonly brandSectionStyle = signal<'brand-section-std' | 'brand-section-white'>('brand-section-std');
  protected readonly brandSectionStyleText = computed(() => this.brandSectionStyle() === 'brand-section-std' ? 'Standard-Style' : 'Weißer Hintergrund');

  toggleBrandSectionStyle() {
    this.brandSectionStyle.update(style => style === 'brand-section-std' ? 'brand-section-white' : 'brand-section-std');
  }

}
