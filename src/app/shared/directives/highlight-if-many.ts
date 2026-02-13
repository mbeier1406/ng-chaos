import { Directive, effect, ElementRef, Input } from '@angular/core';

/**
 * Directive zum Highlighten von Elementen, wenn sie mehr als 5 Bilder enthalten
 * @example
 * ```html
 * <div appHighlightIfMany>
 *   <p>Anzahl aller bestellten Bilder insgesamt: {{ cidkartenService.anzahlItemsInsgesamt() }}</p>
 * </div>
 * ```
 */
@Directive({
  selector: '[appHighlightIfMany]',
})
export class HighlightIfMany {

  /** Input: Die aktuelle Anzahl zum Vergleichen */
  @Input() appHighlightIfMany: number = 0;

  /** Input: Der Schwellenwert für Warnungen (default: 3) */
  @Input() highlightWarning: number = 3;

  /** Input: Der Schwellenwert (default: 5) */
  @Input() highlightThreshold: number = 5;

  constructor(el: ElementRef) {
    effect(() => {
      if (this.appHighlightIfMany > this.highlightThreshold) {
        el.nativeElement.style.color = 'red';
        el.nativeElement.style.fontWeight = 'bold';
      } else if (this.appHighlightIfMany > this.highlightWarning) {
        el.nativeElement.style.color = 'yellow';
      } else {
        el.nativeElement.style.color = 'black';
        el.nativeElement.style.fontWeight = 'normal';
      }
    });
  }
}
