import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ScheduleTableComponent } from './schedule-table.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ShipService } from 'src/app/services/ships/ship.service';
import { of } from 'rxjs';

class ShipServiceMock {
  getShips() { return null; }
}

describe('ScheduleTableComponent', () => {
  let component: ScheduleTableComponent;
  let fixture: ComponentFixture<ScheduleTableComponent>;
  let service: ShipService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes([])],
      declarations: [ ScheduleTableComponent ],
      providers: [
        { provide: ShipService, useClass: ShipServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTableComponent);
    injector = getTestBed();
    service = injector.get(ShipService);
    spyOn(service, 'getShips')
    .and
    .returnValue(of([]));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
