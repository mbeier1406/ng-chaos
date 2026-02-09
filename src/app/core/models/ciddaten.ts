/**
 * Interface für Ciddaten-Objekte
 * 
 * @description
 * Repräsentiert ein Foto-Datenelement mit allen zugehörigen Metadaten wie
 * Datum, Beschreibung, Standort und weiteren Informationen.
 */
export interface Ciddaten {
    /** Eindeutige ID des Ciddaten-Eintrags */
    id: number;
    /** Datum der Aufnahme */
    date: Date;
    /** Beschreibung des Fotos */
    description: string;
    /** URL oder Pfad zum Foto */
    photo: string;
    /** Standort der Aufnahme */
    location: string;
    /** Jahreszeit der Aufnahme */
    season: string;
    /** Zeitpunkt der Aufnahme */
    zeit: string;
    /** Zusätzlicher Hinweis zum Foto */
    hinweis: string;
}
