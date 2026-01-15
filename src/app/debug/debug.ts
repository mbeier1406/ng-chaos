import { Component, input } from '@angular/core';
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

  toggleDebug() {
    this.debug = !this.debug;
  }
  setDebugStatus() {
    this.debugStatus = `Debug: ${this.debug}`;
  }
}
