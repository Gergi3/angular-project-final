import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCudComponent } from './article-cud.component';

describe('ArticleCudComponent', () => {
  let component: ArticleCudComponent;
  let fixture: ComponentFixture<ArticleCudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
