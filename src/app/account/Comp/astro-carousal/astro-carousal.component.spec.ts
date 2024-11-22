import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroCarousalComponent } from './astro-carousal.component';

describe('AstroCarousalComponent', () => {
  let component: AstroCarousalComponent;
  let fixture: ComponentFixture<AstroCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstroCarousalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AstroCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
