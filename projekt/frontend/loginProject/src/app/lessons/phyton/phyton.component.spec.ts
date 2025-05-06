import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhytonComponent } from './phyton.component';

describe('PhytonComponent', () => {
  let component: PhytonComponent;
  let fixture: ComponentFixture<PhytonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhytonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhytonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
