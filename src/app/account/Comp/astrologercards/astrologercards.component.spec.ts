import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologercardsComponent } from './astrologercards.component';

describe('AstrologercardsComponent', () => {
  let component: AstrologercardsComponent;
  let fixture: ComponentFixture<AstrologercardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstrologercardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AstrologercardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
