import { Directive, input, signal, computed } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.background-color]': 'backgroundStyle()',
    '[style.font-weight]': 'fontWeight()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  }
})
export class Highlight {
  color = input<string>('black');
  intensity = input<number>(0.3);
  isHovered = signal<boolean>(false);
  backgroundStyle = computed(() => {
    const baseColor = this.color();
    const alpha = this.isHovered() ? this.intensity() : this.intensity() * 0.1 as number;
    const colorMap : Record<string, string> = {
      'black': `rgba(0, 0, 0, ${alpha})`,
      'white': `rgba(255, 255, 255, ${alpha})`,
      'red': `rgba(255, 0, 0, ${alpha})`,
      'green': `rgba(0, 255, 0, ${alpha})`,
      'blue': `rgba(0, 0, 255, ${alpha})`,
      'yellow': `rgba(255, 255, 0, ${alpha})`,
    };
    return colorMap[baseColor] || colorMap['black'];
  });
  fontWeight = computed(() => this.isHovered() ? 'bold' : 'normal');

  constructor() { }

  onMouseEnter() {
    this.isHovered.set(true);
  }

  onMouseLeave() {
    this.isHovered.set(false);
  }

}
