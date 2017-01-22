/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogintestComponent } from './login.component';

describe('LogintestComponent', () => {
  let component: LogintestComponent;
  let fixture: ComponentFixture<LogintestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogintestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
