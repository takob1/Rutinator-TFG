import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEjercicioSortDescComponent } from './list-ejercicio-sort-desc.component';

describe('ListEjercicioSortDescComponent', () => {
  let component: ListEjercicioSortDescComponent;
  let fixture: ComponentFixture<ListEjercicioSortDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEjercicioSortDescComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEjercicioSortDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
