import { Component, viewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-canvas-demo',
  imports: [],
  standalone: true,
  templateUrl: './canvas-demo.html',
  styleUrl: './canvas-demo.css',
})
export class CanvasDemo  implements AfterViewInit, OnDestroy {
    canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
    imgX : number = 50;
    imgY : number = 160;
    private worker : Worker | null = null;
    private tickInterval : ReturnType<typeof setInterval> | null = null;
    private boundKeyDown = (event: KeyboardEvent) => this.handleKeyDown(event);
  
    private get ctx(): CanvasRenderingContext2D | null {
      return this.canvasRef()?.nativeElement.getContext('2d') ?? null;
    }
  
    ngAfterViewInit(): void {
      this.draw();
      document.addEventListener('keydown', this.boundKeyDown);
      this.startTick();
    }
  
    private draw(): void {
      const ctx = this.ctx;
      if (!ctx) return;
  
      const canvas = ctx.canvas;
  
      // Hintergrund
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Geometrische Formen
      ctx.fillStyle = 'steelblue';
      ctx.fillRect(50, 50, 120, 80);
  
      ctx.strokeStyle = 'coral';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(280, 120, 60, 0, Math.PI * 2);
      ctx.stroke();
  
      // Bild zeichnen (JPEG/PNG) – nach dem Laden
      const img = new Image();
      //img.crossOrigin = 'anonymous'; // nur nötig bei externen URLs
      img.src = '/Cid0.png'
      img.onload = () => {
        ctx.drawImage(img, this.imgX, this.imgY, 150, 100); // x, y, Breite, Höhe
      };
    }

  ngOnDestroy(): void {
    this.stopTick();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.imgX += 10;
    }
    if (event.key === 'ArrowLeft') {
      this.imgX -= 10;
    }
    console.log(this.imgX, this.imgY);
    this.draw();
  }

  startTick(): void {
    this.stopTick();
    this.worker = new Worker(new URL('./cid-movement-worker', import.meta.url), { type: 'module' });
    this.worker.onmessage = (event: MessageEvent) => {
      this.imgX = event.data.x;
      this.imgY = event.data.y;
      this.draw();
    };
    this.tickInterval = setInterval(() => this.worker?.postMessage({ type: 'tick' }), 250);
  }

  stopTick(): void {
    this.tickInterval && clearInterval(this.tickInterval);
    this.worker?.terminate();
    this.worker = null;
    document.removeEventListener('keydown', this.boundKeyDown);
  }

}
