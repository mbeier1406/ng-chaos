import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cidanzeige } from './cidanzeige';

describe('Cidanzeige', () => {
  let component: Cidanzeige;
  let fixture: ComponentFixture<Cidanzeige>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cidanzeige]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cidanzeige);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
