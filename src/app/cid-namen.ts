/**
 * Interface für Cid-Namen und deren Typen
 * 
 * @description
 * Repräsentiert einen Namen von Cid mit seinem zugehörigen Typ (z.B. Name, Spitzname)
 */
export interface CidNamen {
    /** Der Typ des Namens (z.B. 'Name', 'Spitzname') */
    typ: string;
    /** Der eigentliche Name */
    name: string;
}

/**
 * Liste aller bekannten Namen von Cid
 * 
 * @description
 * Vordefinierte Liste mit verschiedenen Namen und Spitznamen von Cid
 */
export const CID_NAMEN_LISTE: CidNamen[] = [
    { typ: 'Name', name: 'Cid' },
    { typ: 'Spitzname', name: 'Butschi' },
    { typ: 'Spitzname', name: 'Schnuffdi' }
];