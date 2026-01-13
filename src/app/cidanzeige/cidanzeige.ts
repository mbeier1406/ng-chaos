import { Component, input } from '@angular/core';
import {RouterLink} from '@angular/router';
import { Ciddaten } from '../ciddaten';

@Component({
  selector: 'app-cidanzeige',
  imports: [RouterLink],
  templateUrl: './cidanzeige.html',
  styleUrl: './cidanzeige.css',
})
export class Cidanzeige {
  ciddaten = input.required<Ciddaten>();
}
