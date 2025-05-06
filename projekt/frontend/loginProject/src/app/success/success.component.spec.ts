import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriaComponent } from './success.component';

describe('SuccessComponent', () => {
  let component:  GaleriaComponent;
  let fixture: ComponentFixture< GaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent( GaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});