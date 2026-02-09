import { Component, inject, model, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CiddatenService } from '../../core/services/ciddaten.service';
import { Ciddaten } from '../../core/models/ciddaten';
import { DetailService } from '../../core/services/detail.service';
import { Checkbox } from '../../shared/components/checkbox/checkbox';

/**
 * Detail-Component zur Anzeige eines einzelnen Ciddaten-Eintrags
 * 
 * @description
 * Zeigt detaillierte Informationen zu einem Ciddaten-Eintrag an und bietet
 * ein Formular zum Versenden des Bildes per E-Mail.
 */
@Component({
  selector: 'app-detail',
  imports: [ReactiveFormsModule, Checkbox],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  /** Referenz zum ChangeDetectorRef für manuelle Change Detection */
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  
  /** Route zum Abrufen der ID aus den URL-Parametern */
  route: ActivatedRoute = inject(ActivatedRoute);
  
  /** Service zum Abrufen von Ciddaten */
  ciddatenService: CiddatenService = inject(CiddatenService);
  
  /** Service zur Verwaltung des zuletzt gesendeten Bildes */
  detailService: DetailService = inject(DetailService);
  
  /** Das aktuell angezeigte Ciddaten-Objekt */
  ciddaten: Ciddaten | undefined;
  
  /**
   * Formular für das Versenden von Bildern
   * 
   * @property name - Name des Empfängers
   * @property email - E-Mail-Adresse des Empfängers
   */
  bildSendenForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  /** Model Signal für das two-way binding des Checkboxes */
  schoenesBild = model<boolean>(false);

  /** Model Signal für das two-way binding des Checkboxes */
  ichWillMehrBilder = model<boolean>(false);

  /**
   * Konstruktor - lädt die Ciddaten anhand der ID aus der URL
   */
  constructor() {
    const ciddatenId = parseInt(this.route.snapshot.params['id'], 10);
    this.ciddatenService.getCiddatenById(ciddatenId).then((ciddaten) => {
      this.ciddaten = ciddaten;
      this.changeDetectorRef.markForCheck();
    });
  }
  
  /**
   * Sendet das aktuelle Bild per E-Mail an den im Formular angegebenen Empfänger
   * 
   * @description
   * Ruft den CiddatenService zum Versenden auf und aktualisiert den Status
   * des zuletzt gesendeten Bildes im DetailService.
   */
  bildSenden() {
    this.ciddatenService.bildSenden(
      this.bildSendenForm.value.name ?? '',
      this.bildSendenForm.value.email ?? '',
      this.ciddaten?.id ?? 0);
    this.detailService.setLetztesGesendetesBild(this.ciddaten?.description ?? '');
  }

  /**
   * Prüft, ob ein Feld einen Fehler hat und bereits bearbeitet wurde
   * @param fieldName - Name des FormControl-Felds
   * @returns true wenn Feld invalid und touched
   */
  hasError(fieldName: string): boolean {
    const field = this.bildSendenForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  /**
   * Prüft, ob ein bestimmter Fehler für ein Feld existiert
   * @param fieldName - Name des FormControl-Felds
   * @param errorType - Typ des Fehlers (z.B. 'required', 'email')
   * @returns true wenn der spezifische Fehler existiert
   */
  hasSpecificError(fieldName: string, errorType: string): boolean {
    const field = this.bildSendenForm.get(fieldName);
    return field ? field.hasError(errorType) && field.touched : false;
  }


  /**
   * Schaltet den Checkbox für das schoenes Bild um
   */
  toggleSchoenesBild() {
    this.schoenesBild.set(!this.schoenesBild());
  }

  /**
   * Schaltet den Checkbox für das ich will mehr Bilder um
   */
  toggleIchWillMehrBilder() {
    this.ichWillMehrBilder.set(!this.ichWillMehrBilder());
  }

  /**
   * Setzt die Checkboxen zurück
   */
  resetCheckBoxes() {
    this.schoenesBild.set(false);
    this.ichWillMehrBilder.set(false);
  }

}
