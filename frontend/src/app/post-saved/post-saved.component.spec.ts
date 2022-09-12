import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSavedComponent } from './post-saved.component';

describe('PostSavedComponent', () => {
  let component: PostSavedComponent;
  let fixture: ComponentFixture<PostSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
