import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEmailFormComponent } from './general-email-form.component';

describe('GeneralEmailFormComponent', () => {
  let component: GeneralEmailFormComponent;
  let fixture: ComponentFixture<GeneralEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralEmailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
