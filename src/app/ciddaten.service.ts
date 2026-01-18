import { Injectable } from '@angular/core';
import { Ciddaten } from './ciddaten';

/**
 * Service zum Abrufen und Verwalten von Ciddaten
 * 
 * @description
 * Stellt Methoden zum Abrufen von Ciddaten vom Backend-Server bereit
 * und bietet Funktionalität zum Versenden von Bildern per E-Mail.
 */
@Injectable({
  providedIn: 'root',
})
export class CiddatenService {
  /** URL zum Backend-Server für Ciddaten */
  readonly url = 'http://localhost:3000/ciddaten';
  
  /**
   * Ruft alle Ciddaten vom Server ab
   * 
   * @returns Promise mit Array aller Ciddaten
   * @example
   * ```typescript
   * const alleDaten = await ciddatenService.getAllCiddaten();
   * ```
   */
  async getAllCiddaten(): Promise<Ciddaten[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [] ;
  }
  
  /**
   * Ruft ein bestimmtes Ciddaten-Objekt anhand der ID ab
   * 
   * @param id - Die eindeutige ID des gesuchten Ciddaten-Eintrags
   * @returns Promise mit dem Ciddaten-Objekt oder undefined, falls nicht gefunden
   * @example
   * ```typescript
   * const ciddaten = await ciddatenService.getCiddatenById(42);
   * ```
   */
  async getCiddatenById(id: number): Promise<Ciddaten | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const ciddatenJson = await data.json();
    return ciddatenJson[0] ?? {};
  }
  
  /**
   * Sendet ein Bild per E-Mail an einen Benutzer
   * 
   * @param name - Name des Empfängers
   * @param email - E-Mail-Adresse des Empfängers
   * @param bildId - ID des zu versendenden Bildes
   * @todo Implementierung des E-Mail-Versands
   */
  bildSenden(name: string, email: string, bildId: number) {
    console.log(`Bild senden: name=${name}, email=${email}, bildId=${bildId}`);
  }
}
