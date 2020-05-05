import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ShipsListComponent } from './ships-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShipService } from 'src/app/services/ships/ship.service';
import { of } from 'rxjs';

class ShipServiceMock {
  getShips() { return null; }
}

describe('ShipsListComponent', () => {
  let component: ShipsListComponent;
  let fixture: ComponentFixture<ShipsListComponent>;
  let service: ShipService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ShipsListComponent],
      providers: [
        { provide: ShipService, useClass: ShipServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsListComponent);
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
