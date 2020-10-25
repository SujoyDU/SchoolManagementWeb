import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkexamComponent } from './markexam.component';

describe('MarkexamComponent', () => {
  let component: MarkexamComponent;
  let fixture: ComponentFixture<MarkexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
