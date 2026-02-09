/**
 * Lädt einen User aus der Datenbank, Datei oder Konstanten.
 * @param id - Die ID des zu ladenden Users
 * @returns Promise mit dem User-Objekt
 * @example
 * ```typescript
 * const user = await loadUser(1);
 * ```
 */
export async function loadUser(id: number): Promise<{id: number, name: string}> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Etwas warten... (z.B. Datenbankabfrage)
  switch (id) {
    case 1:
      return {id, name: 'Max Mustermann'};
    case 2:
      return {id, name: 'Erika Mustermann'};
    case 3:
      return {id, name: 'Kulle Wolters'};
    default:
      throw new Error(`User with id ${id} not found`);
  }
}
