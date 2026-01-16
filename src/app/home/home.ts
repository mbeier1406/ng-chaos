import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Ciddaten } from '../ciddaten';
import { CiddatenService } from '../ciddaten.service';
import { Cidanzeige } from '../cidanzeige/cidanzeige';
import { Debug } from "../debug/debug";

@Component({
  selector: 'app-home',
  imports: [Cidanzeige, Debug],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly ciddatenService = inject(CiddatenService);
  ciddatenList : Ciddaten[] = [];
  filteredCiddatenListe : Ciddaten[] = [];
  debugStatus : string = 'Debug: ';

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
  showDebug(event: string) {
    this.debugStatus = event;
  }
}
