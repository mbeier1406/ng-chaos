import { computed, Injectable, signal } from '@angular/core';
import { Cidkarte } from '../models/cidkarte';

/**
 * Service zur Verwaltung der bestellten Cidkarten (Bilder)
 * 
 * @description
 * Stellt Methoden zum Hinzufügen und Entfernen von Cidkarten aus der Liste der bestellten Bilder bereit.
 */
@Injectable({
  providedIn: 'root'
})
export class CidkartenService {
    /** Liste aller Cidkarten (bestellte Bilder) */
    private cidkarten = signal<Cidkarte[]>([]);
    /** Readonly Signal für die Liste aller Cidkarten (bestellte Bilder) */
    readonly cidkartenItems = this.cidkarten.asReadonly();
    /** Readonly Signal für die Anzahl aller bestellten Bilder insgesamt */
    readonly anzahlItemsInsgesamt = computed(() => this.cidkartenItems().reduce((acc, item) => acc + item.anzahl, 0));

    /**
     * Fügt ein Bild zur Liste der bestellten Bilder hinzu bzw. erhöht die Anzahl eines bestehenden Bildes.
     * @param id - Die ID des Bildes, das hinzugefügt werden soll
     * @example
     * ```typescript
     * cidkartenService.addItem(1);
     * ```
     */
    public addItem(id: number) {
        this.cidkarten.update(items => {
            const existingItem = items.find(i => i.id === id);
            if (existingItem) {
                return items.map(i => i.id === id ? { ...i, anzahl: i.anzahl + 1 } : i);
            }
            return [...items, { id: id, anzahl: 1 }];
        });
    }

    /**
     * Entfernt ein Bild aus der Liste der bestellten Bilder. Wenn die Anzahl des Bildes 0 ist, wird das Bild aus der Liste entfernt.
     * @param id - Die ID des Bildes, das entfernt werden soll
     * @example
     * ```typescript
     * cidkartenService.removeItem(1);
     * ```
     */
    public removeItem(id: number) {
        this.cidkarten.update(items => {
            const existingItem = items.find(i => i.id === id);
            if (existingItem) {
                if (existingItem.anzahl > 1) { // Bild existiert und Anzahl > 1, also nur die Anzahl reduzieren
                    return items.map(i => i.id === id ? { ...i, anzahl: i.anzahl - 1 } : i);
                } else {
                    return items.filter(i => i.id !== id); // Bild entfernen
                }
            }
            return items; // Bild nicht gefunden, nichts tun
        });
    }

    /**
     * Ruft die Anzahl aller bestellten Bilder eines bestimmten Bildes ab
     * @param id - Die ID des Bildes, für das die Anzahl bestellter Bilder abgerufen werden soll
     * @returns Die Anzahl aller bestellten Bilder eines bestimmten Bildes
     * @example
     * ```typescript
     * const anzahl = cidkartenService.anzahlItemsVonBild(1);
     * ```
     */
    public anzahlItemsVonBild(id: number): number {
        return this.cidkartenItems().find(i => i.id === id)?.anzahl ?? 0;
    }
}
