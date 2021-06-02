import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEjercicioSortAscComponent } from './list-ejercicio-sort-asc.component';

describe('ListEjercicioSortAscComponent', () => {
  let component: ListEjercicioSortAscComponent;
  let fixture: ComponentFixture<ListEjercicioSortAscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEjercicioSortAscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEjercicioSortAscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
