import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduleModalComponent } from './delete-schedule-modal.component';

describe('DeleteScheduleModalComponent', () => {
  let component: DeleteScheduleModalComponent;
  let fixture: ComponentFixture<DeleteScheduleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteScheduleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
