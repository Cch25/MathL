import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorsStartComponent } from './vectors-start.component';

describe('VectorsStartComponent', () => {
  let component: VectorsStartComponent;
  let fixture: ComponentFixture<VectorsStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorsStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
