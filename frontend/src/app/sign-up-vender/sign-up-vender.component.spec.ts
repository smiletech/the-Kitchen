import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpVenderComponent } from './sign-up-vender.component';

describe('SignUpVenderComponent', () => {
  let component: SignUpVenderComponent;
  let fixture: ComponentFixture<SignUpVenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpVenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
