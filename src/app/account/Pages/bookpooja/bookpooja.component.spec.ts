import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookpoojaComponent } from './bookpooja.component';

describe('BookpoojaComponent', () => {
  let component: BookpoojaComponent;
  let fixture: ComponentFixture<BookpoojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookpoojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookpoojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
