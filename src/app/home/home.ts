import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ciddaten } from '../ciddaten';
import { CiddatenService } from '../ciddaten.service';
import { Cidanzeige } from '../cidanzeige/cidanzeige';
import { Debug } from "../debug/debug";
import { DetailService } from '../detail.service';

/**
 * Home-Component der Anwendung
 * 
 * @description
 * Hauptseite, die alle Ciddaten anzeigt mit Filter- und Debug-Funktionalität.
 * Lädt beim Start alle Ciddaten vom Server und ermöglicht Filterung nach Ort und Beschreibung.
 */
@Component({
  selector: 'app-home',
  imports: [Cidanzeige, Debug, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy {
  /** Referenz zum ChangeDetectorRef für manuelle Change Detection */
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  
  /** Service zum Abrufen von Ciddaten */
  private readonly ciddatenService = inject(CiddatenService);
  
  /** Service zur Verwaltung von Detail-Informationen */
  private readonly detailService = inject(DetailService);
  
  /** Subscription für das zuletzt gesendete Bild */
  private subscription? : Subscription;
  
  /** Liste aller Ciddaten vom Server */
  ciddatenList : Ciddaten[] = [];
  
  /** Gefilterte Liste der Ciddaten basierend auf Suchkriterien */
  filteredCiddatenListe : Ciddaten[] = [];
  
  /** Status-Text für Debug-Informationen */
  debugStatus : string = 'Debug: ';
  
  /** Beschreibung des zuletzt gesendeten Bildes */
  letztesGesendetesBild : string = '';

  /**
   * Konstruktor - lädt alle Ciddaten beim Initialisieren
   */
  constructor() {
    this.ciddatenService.getAllCiddaten().then((ciddaten) => {
      this.ciddatenList = ciddaten;
      this.filteredCiddatenListe = ciddaten;
      this.changeDetectorRef.markForCheck();
    });
  }
  
  /**
   * OnInit Lifecycle Hook - abonniert das zuletzt gesendete Bild
   */
  ngOnInit() {
    this.subscription = this.detailService.letztesGesendetesBild$.subscribe((bild) => {
      this.letztesGesendetesBild = `Letztes gesendetes Bild: ${bild}`;
    });
  }
  
  /**
   * OnDestroy Lifecycle Hook - meldet Subscriptions ab
   */
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  
  /**
   * Filtert die Ciddaten-Liste nach Ort und/oder Beschreibung
   * 
   * @param ort - Suchtext für den Ort (case-insensitive)
   * @param beschreibung - Suchtext für die Beschreibung (case-insensitive)
   * @example
   * ```typescript
   * home.filterListe('Berlin', 'Strand');
   * ```
   */
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
  
  /**
   * Aktualisiert den Debug-Status
   * 
   * @param event - Der neue Debug-Status-Text
   */
  showDebug(event: string) {
    this.debugStatus = event;
  }
}
