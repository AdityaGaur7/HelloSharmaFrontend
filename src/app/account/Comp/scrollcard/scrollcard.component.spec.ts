import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollcardComponent } from './scrollcard.component';

describe('ScrollcardComponent', () => {
  let component: ScrollcardComponent;
  let fixture: ComponentFixture<ScrollcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
