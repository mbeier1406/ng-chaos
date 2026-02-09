import { Component, input } from '@angular/core';
import {RouterLink} from '@angular/router';
import { Ciddaten } from '../../../core/models/ciddaten';

/**
 * Component zur Anzeige eines einzelnen Ciddaten-Eintrags in der Übersicht
 * 
 * @description
 * Stellt ein Ciddaten-Objekt in einer Kachelansicht dar.
 * Wird typischerweise in einer Liste von mehreren Ciddaten verwendet.
 */
@Component({
  selector: 'app-cidanzeige',
  imports: [RouterLink],
  templateUrl: './cidanzeige.html',
  styleUrl: './cidanzeige.css',
})
export class Cidanzeige {
  /**
   * Das anzuzeigende Ciddaten-Objekt
   * 
   * @required
   * @description Pflichtfeld - muss von der Parent-Component übergeben werden
   */
  ciddaten = input.required<Ciddaten>();

  /**
   * Information zum anzuzeigenden Ciddaten-Objekts. Optional
   * @description
   * Wird verwendet, um die Beschreibung des Ciddaten-Objekts in der Kachelansicht anzuzeigen.
   */
  ciddatenInfo = input<string>('ciddatenInfo');

}
