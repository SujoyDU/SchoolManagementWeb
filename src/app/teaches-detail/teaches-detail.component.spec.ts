import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachesDetailComponent } from './teaches-detail.component';

describe('TeachesDetailComponent', () => {
  let component: TeachesDetailComponent;
  let fixture: ComponentFixture<TeachesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
