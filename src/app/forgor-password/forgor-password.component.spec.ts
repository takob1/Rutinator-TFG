import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { ForgorPasswordComponent } from './forgor-password.component';

describe('ForgorPasswordComponent', () => {
  let component: ForgorPasswordComponent;
  let fixture: ComponentFixture<ForgorPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgorPasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgorPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
