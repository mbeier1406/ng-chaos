import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Ciddaten } from '../ciddaten';
import { CiddatenService } from '../ciddaten.service';
import { Cidanzeige } from '../cidanzeige/cidanzeige';

@Component({
  selector: 'app-home',
  imports: [Cidanzeige],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly ciddatenService = inject(CiddatenService);
  debug = true;
  cidNamenListe = [{typ: 'Name', name: 'Cid'}, {typ: 'Spitzname', name: 'Butschi'}, {typ: 'Spitzname', name: 'Schnuffdi'}];
  ciddatenList : Ciddaten[] = [];
  filteredCiddatenListe : Ciddaten[] = [];

  constructor() {
    this.ciddatenService.getAllCiddaten().then((ciddaten) => {
      this.ciddatenList = ciddaten;
      this.filteredCiddatenListe = ciddaten;
      this.changeDetectorRef.markForCheck();
    });
  }
  filterListe(ort: string, beschreibung: string) {
    if ( !ort && !beschreibung ) {
      this.filteredCiddatenListe = this.ciddatenList;
      return;
    }
    if ( ort ) {
      this.filteredCiddatenListe = this.ciddatenList.filter((ciddaten) =>
        ciddaten.location.toLowerCase().includes(ort.toLowerCase()));
    }
    if ( beschreibung ) {
      this.filteredCiddatenListe = this.filteredCiddatenListe.filter((ciddaten) =>
        ciddaten.description.toLowerCase().includes(beschreibung.toLowerCase()));
    }
  }
  toggleDebug() {
    this.debug = !this.debug;
    this.changeDetectorRef.markForCheck();
  }
}
