import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveexamComponent } from './giveexam.component';

describe('GiveexamComponent', () => {
  let component: GiveexamComponent;
  let fixture: ComponentFixture<GiveexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
