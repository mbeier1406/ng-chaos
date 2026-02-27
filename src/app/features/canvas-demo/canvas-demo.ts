import { Component, viewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas-demo',
  imports: [],
  standalone: true,
  templateUrl: './canvas-demo.html',
  styleUrl: './canvas-demo.css',
})
export class CanvasDemo  implements AfterViewInit {
    canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  
    private get ctx(): CanvasRenderingContext2D | null {
      return this.canvasRef()?.nativeElement.getContext('2d') ?? null;
    }
  
    ngAfterViewInit(): void {
      this.draw();
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
        ctx.drawImage(img, 50, 160, 150, 100); // x, y, Breite, Höhe
      };
    }

  }
