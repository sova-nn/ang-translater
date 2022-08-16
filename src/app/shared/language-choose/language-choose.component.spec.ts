import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageChooseComponent } from './language-choose.component';

describe('LanguageChooseComponent', () => {
  let component: LanguageChooseComponent;
  let fixture: ComponentFixture<LanguageChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
