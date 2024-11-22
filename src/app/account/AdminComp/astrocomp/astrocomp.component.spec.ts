import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrocompComponent } from './astrocomp.component';

describe('AstrocompComponent', () => {
  let component: AstrocompComponent;
  let fixture: ComponentFixture<AstrocompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstrocompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AstrocompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
