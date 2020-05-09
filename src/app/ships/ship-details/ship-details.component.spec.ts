import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDetailsComponent } from './ship-details.component';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('ShipDetailsComponent', () => {
  let component: ShipDetailsComponent;
  let fixture: ComponentFixture<ShipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbAccordionModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([])],
      declarations: [ShipDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                shipId: 5
              }
            }
          }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addDays', () => {
    it('should add days to date', () => {
      const date = new Date(2020, 9, 30);

      const result = component.addDays(date, 5);

      expect(result.getDate()).toEqual(4);
      expect(result.getMonth()).toEqual(10);
    });

    it('should not change parameter', () => {
      const date = new Date(2020, 10, 10);

      component.addDays(date, 5);

      expect(date.getDate()).toEqual(10);
    });
  });

  describe('previousWeek', () => {

    beforeEach(() => {
      spyOn(component, 'filterSchedules');
    });

    it('should substract 7 days from weekStart and weekEnd', () => {
      component.weekStart = new Date(2020, 5, 1);
      component.weekEnd = new Date(2020, 9, 30);

      component.previousWeek();

      expect(component.weekStart.getDate()).toEqual(25);
      expect(component.weekStart.getMonth()).toEqual(4);
      expect(component.weekEnd.getDate()).toEqual(23);
      expect(component.weekEnd.getMonth()).toEqual(9);
    });

    it('should filter schedules', () => {

      component.previousWeek();

      expect(component.filterSchedules).toHaveBeenCalledTimes(1);
    });
  });
});
