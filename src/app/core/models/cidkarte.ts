
/**
 * Interface für Cidkarte-Objekte
 * 
 * @description
 * Repräsentiert ein Bild, und wie oft es bestellt wurde.
 * 
 * @property id - Die eindeutige ID des Bildes
 * @property anzahl - Die Anzahl, wie oft das Bild bestellt wurde
 */
export interface Cidkarte {
    /** Die eindeutige ID des Bildes */
    id: number;
    /** Die Anzahl, wie oft das Bild bestellt wurde */
    anzahl: number;
}
