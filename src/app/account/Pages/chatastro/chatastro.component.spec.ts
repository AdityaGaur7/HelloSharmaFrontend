import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatastroComponent } from './chatastro.component';

describe('ChatastroComponent', () => {
  let component: ChatastroComponent;
  let fixture: ComponentFixture<ChatastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
