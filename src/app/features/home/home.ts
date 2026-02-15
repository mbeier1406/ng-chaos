import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ciddaten } from '../../core/models/ciddaten';
import { CiddatenService } from '../../core/services/ciddaten.service';
import { Cidanzeige } from '../../shared/components/cidanzeige/cidanzeige';
import { Debug } from '../../features/debug/debug';
import { DetailService } from '../../core/services/detail.service';
import { CidkartenService } from '../../core/services/cidkarten-service';
import { HighlightIfMany } from '../../shared/directives/highlight-if-many';
import { Highlight } from '../../shared/directives/highlight';

/**
 * Home-Component der Anwendung
 * 
 * @description
 * Hauptseite, die alle Ciddaten anzeigt mit Filter- und Debug-Funktionalität.
 * Lädt beim Start alle Ciddaten vom Server und ermöglicht Filterung nach Ort und Beschreibung.
 */
@Component({
  selector: 'app-home',
  imports: [Cidanzeige, Debug, RouterLink, HighlightIfMany, Highlight],
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

  /** Service zur Verwaltung der bestellten Cidkarten (Bilder) */
  protected readonly cidkartenService = inject(CidkartenService);
  
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
