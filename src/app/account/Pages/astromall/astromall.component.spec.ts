import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstromallComponent } from './astromall.component';

describe('AstromallComponent', () => {
  let component: AstromallComponent;
  let fixture: ComponentFixture<AstromallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstromallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AstromallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
