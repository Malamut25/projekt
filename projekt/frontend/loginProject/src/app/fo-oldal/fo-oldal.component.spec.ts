import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoOldalComponent } from './fo-oldal.component';

describe('FoOldalComponent', () => {
  let component: FoOldalComponent;
  let fixture: ComponentFixture<FoOldalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoOldalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoOldalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
