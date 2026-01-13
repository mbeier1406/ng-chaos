import {Component, inject, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CiddatenService } from '../ciddaten.service';
import { Ciddaten } from '../ciddaten';

@Component({
  selector: 'app-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  ciddatenService: CiddatenService = inject(CiddatenService);
  ciddaten: Ciddaten | undefined;
  bildSendenForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const ciddatenId = parseInt(this.route.snapshot.params['id'], 10);
    this.ciddatenService.getCiddatenById(ciddatenId).then((ciddaten) => {
      this.ciddaten = ciddaten;
      this.changeDetectorRef.markForCheck();
    });
  }
  bildSenden() {
    this.ciddatenService.bildSenden(
      this.bildSendenForm.value.name ?? '',
      this.bildSendenForm.value.email ?? '',
      this.ciddaten?.id ?? 0);
  }
}
