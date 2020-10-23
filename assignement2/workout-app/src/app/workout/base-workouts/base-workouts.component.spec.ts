import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWorkoutsComponent } from './base-workouts.component';

describe('BaseWorkoutsComponent', () => {
  let component: BaseWorkoutsComponent;
  let fixture: ComponentFixture<BaseWorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWorkoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
