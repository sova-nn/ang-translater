import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorWindowComponent } from './translator-window.component';

describe('TranslatorWindowComponent', () => {
  let component: TranslatorWindowComponent;
  let fixture: ComponentFixture<TranslatorWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslatorWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslatorWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
