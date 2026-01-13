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

  constructor() {
    const ciddatenId = parseInt(this.route.snapshot.params['id'], 10);
    this.ciddatenService.getCiddatenById(ciddatenId).then((ciddaten) => {
      this.ciddaten = ciddaten;
      this.changeDetectorRef.markForCheck();
    });
  }

}
