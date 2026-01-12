import { Component, input } from '@angular/core';
import { Ciddaten } from '../ciddaten';

@Component({
  selector: 'app-cidanzeige',
  imports: [],
  templateUrl: './cidanzeige.html',
  styleUrl: './cidanzeige.css',
})
export class Cidanzeige {
  ciddaten = input.required<Ciddaten>();
}
