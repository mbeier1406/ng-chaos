import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDemo } from './canvas-demo';

describe('CanvasDemo', () => {
  let component: CanvasDemo;
  let fixture: ComponentFixture<CanvasDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
