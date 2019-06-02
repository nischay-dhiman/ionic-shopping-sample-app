import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPage } from './shipping.page';

describe('ShippingPage', () => {
  let component: ShippingPage;
  let fixture: ComponentFixture<ShippingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
