import { Component, input, output } from '@angular/core';
import { UpperCasePipe, LowerCasePipe, JsonPipe, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CidNamen, CID_NAMEN_LISTE } from '../cid-namen';
import { Ciddaten } from '../ciddaten';
import { Loader } from "../loader/loader";
import { BoldPipe } from "../bold-pipe";

/**
 * Debug-Component zur Anzeige von Debug-Informationen
 * 
 * @description
 * Zeigt Debug-Informationen über die Ciddaten-Liste an, einschließlich
 * der Anzahl aller und gefilterter Einträge. Enthält auch eine Demo
 * für lazy-loading mit @defer.
 */
@Component({
  selector: 'app-debug',
  imports: [Loader, FormsModule, UpperCasePipe, LowerCasePipe, JsonPipe, DatePipe, DecimalPipe, BoldPipe],
  templateUrl: './debug.html',
  styleUrl: './debug.css',
})
export class Debug {
  /**
   * Status des Debug-Modus
   * @default true
   */
  debug = true;
  
  /**
   * Status-Text für Debug-Informationen
   * @default 'Debug: true'
   */
  debugStatus: string = `Debug: ${this.debug}`;
  
  /**
   * Liste der Cid-Namen für Debug-Anzeige
   * @default CID_NAMEN_LISTE
   */
  cidNamenListe : CidNamen[] = CID_NAMEN_LISTE;
  
  /**
   * Liste aller Ciddaten
   * @required Input-Property von Parent-Component
   */
  ciddatenListe = input.required<Ciddaten[]>();
  
  /**
   * Liste der gefilterten Ciddaten
   * @required Input-Property von Parent-Component
   */
  filteredCiddatenListe = input.required<Ciddaten[]>();
  
  /**
   * Event-Emitter für Debug-Status-Änderungen
   */
  debugEvent = output<string>();

  /** Aktuelles Dateum anzeigen */
  datum : Date = new Date();

  /**
   * Schaltet den Debug-Modus ein/aus
   * 
   * @description
   * Wechselt zwischen debug=true und debug=false und emittiert ein Event
   * mit dem neuen Status an die Parent-Component.
   */
  toggleDebug() {
    if ( confirm(`Debugmodus wechseln von "${this.debug}"?`) ) {
      this.debug = !this.debug;
      this.debugEvent.emit(`Debug: ${this.debug}`);
      alert(`Debug: ${this.debug}`);
    }
  }
  
  /**
   * Aktualisiert den Debug-Status-Text
   * 
   * @description
   * Wird typischerweise bei Mouseover aufgerufen, um den Status anzuzeigen.
   */
  setDebugStatus() {
    this.debugStatus = `Debug: ${this.debug}`;
  }
}
