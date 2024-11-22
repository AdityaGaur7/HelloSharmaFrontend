import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCompComponent } from './client-comp.component';

describe('ClientCompComponent', () => {
  let component: ClientCompComponent;
  let fixture: ComponentFixture<ClientCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
