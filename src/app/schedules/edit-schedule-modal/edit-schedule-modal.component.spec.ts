import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduleModalComponent } from './edit-schedule-modal.component';
import { FormsModule } from '@angular/forms';

describe('EditScheduleModalComponent', () => {
  let component: EditScheduleModalComponent;
  let fixture: ComponentFixture<EditScheduleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ EditScheduleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
