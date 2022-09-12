import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVenderComponent } from './order-vender.component';

describe('OrderVenderComponent', () => {
  let component: OrderVenderComponent;
  let fixture: ComponentFixture<OrderVenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderVenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
