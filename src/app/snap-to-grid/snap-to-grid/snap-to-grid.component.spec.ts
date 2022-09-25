import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapToGridComponent } from './snap-to-grid.component';

describe('SnapToGridComponent', () => {
  let component: SnapToGridComponent;
  let fixture: ComponentFixture<SnapToGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapToGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapToGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
