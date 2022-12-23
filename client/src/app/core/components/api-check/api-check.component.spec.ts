import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCheckComponent } from './api-check.component';

describe('ApiCheckComponent', () => {
  let component: ApiCheckComponent;
  let fixture: ComponentFixture<ApiCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
