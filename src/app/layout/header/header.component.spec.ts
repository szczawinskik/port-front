import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/commons/services/auth.service';

class AuthServiceMock {
  setAdmin() { return null; }
  setUser() { return null; }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: AuthService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set service to admin', () => {
    injector = getTestBed();
    service = injector.get(AuthService);
    spyOn(service, 'setAdmin');

    component.setAdmin();

    expect(service.setAdmin).toHaveBeenCalledTimes(1);
  });

  it('should set service to user', () => {
    injector = getTestBed();
    service = injector.get(AuthService);
    spyOn(service, 'setUser');

    component.setUser();

    expect(service.setUser).toHaveBeenCalledTimes(1);
  });
});
