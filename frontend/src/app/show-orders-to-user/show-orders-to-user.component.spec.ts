import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrdersToUserComponent } from './show-orders-to-user.component';

describe('ShowOrdersToUserComponent', () => {
  let component: ShowOrdersToUserComponent;
  let fixture: ComponentFixture<ShowOrdersToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrdersToUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrdersToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
