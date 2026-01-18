import { Component } from '@angular/core';

/**
 * Loader-Component für lazy-loading Demo
 * 
 * @description
 * Diese Component wird verwendet, um das @defer lazy-loading Feature
 * von Angular zu demonstrieren. Sie wird nur geladen, wenn sie benötigt wird.
 * 
 * @example
 * ```html
 * @defer (on viewport) {
 *   <app-loader />
 * }
 * ```
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {

}
