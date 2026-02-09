import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service zur Verwaltung des zuletzt gesendeten Bildes
 * 
 * @description
 * Stellt einen reaktiven State für das zuletzt gesendete Bild bereit.
 * Verwendet RxJS BehaviorSubject für reaktive Updates.
 */
@Injectable({
  providedIn: 'root',
})
export class DetailService {
  /** BehaviorSubject für das zuletzt gesendete Bild */
  private letztesGesendetesBildSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  /** Observable für das zuletzt gesendete Bild, zum Abonnieren in Components */
  public letztesGesendetesBild$ : Observable<string> = this.letztesGesendetesBildSubject.asObservable();

  /**
   * Setzt das zuletzt gesendete Bild und benachrichtigt alle Abonnenten
   * 
   * @param bild - Beschreibung oder Identifier des gesendeten Bildes
   * @example
   * ```typescript
   * detailService.setLetztesGesendetesBild('Cid am Strand');
   * ```
   */
  setLetztesGesendetesBild(bild: string) {
    this.letztesGesendetesBildSubject.next(bild);
  }
  
  /**
   * Ruft den aktuellen Wert des zuletzt gesendeten Bildes ab
   * 
   * @returns Beschreibung des zuletzt gesendeten Bildes
   * @example
   * ```typescript
   * const letztesBild = detailService.getLetztesGesendetesBild();
   * ```
   */
  getLetztesGesendetesBild(): string {
    return this.letztesGesendetesBildSubject.getValue();
  }
}
