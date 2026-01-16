import { Component, input, output } from '@angular/core';
import { CidNamen, CID_NAMEN_LISTE } from '../cid-namen';
import { Ciddaten } from '../ciddaten';

@Component({
  selector: 'app-debug',
  imports: [],
  templateUrl: './debug.html',
  styleUrl: './debug.css',
})
export class Debug {
  debug = true;
  debugStatus: string = `Debug: ${this.debug}`;
  cidNamenListe : CidNamen[] = CID_NAMEN_LISTE;
  ciddatenListe = input.required<Ciddaten[]>();
  filteredCiddatenListe = input.required<Ciddaten[]>();
  debugEvent = output<string>();

  toggleDebug() {
    this.debug = !this.debug;
    this.debugEvent.emit(`Debug: ${this.debug}`);
  }
  setDebugStatus() {
    this.debugStatus = `Debug: ${this.debug}`;
  }
}
