import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ciddaten } from '../ciddaten';
import { CiddatenService } from '../ciddaten.service';
import { Cidanzeige } from '../cidanzeige/cidanzeige';
import { Debug } from "../debug/debug";
import { DetailService } from '../detail.service';

@Component({
  selector: 'app-home',
  imports: [Cidanzeige, Debug],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly ciddatenService = inject(CiddatenService);
  private readonly detailService = inject(DetailService);
  private subscription? : Subscription;
  ciddatenList : Ciddaten[] = [];
  filteredCiddatenListe : Ciddaten[] = [];
  debugStatus : string = 'Debug: ';
  letztesGesendetesBild : string = '';

  constructor() {
    this.ciddatenService.getAllCiddaten().then((ciddaten) => {
      this.ciddatenList = ciddaten;
      this.filteredCiddatenListe = ciddaten;
      this.changeDetectorRef.markForCheck();
    });
  }
  ngOnInit() {
    this.subscription = this.detailService.letztesGesendetesBild$.subscribe((bild) => {
      this.letztesGesendetesBild = `Letztes gesendetes Bild: ${bild}`;
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
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
