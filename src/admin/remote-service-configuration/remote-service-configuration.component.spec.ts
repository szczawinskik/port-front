import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';

import { RemoteServiceConfigurationComponent } from './remote-service-configuration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RemoteServiceConfigurationService } from '../services/remote-service-configuration.service';
import { of, Observable, throwError } from 'rxjs';



class RemoteServiceConfigurationServiceMock {
  getRemoteServiceConfigurationAddress() { return null; }
  setRemoteServiceConfigurationAddress() { return null; }
}


describe('RemoteServiceConfigurationComponent', () => {
  let component: RemoteServiceConfigurationComponent;
  let fixture: ComponentFixture<RemoteServiceConfigurationComponent>;
  let service: RemoteServiceConfigurationService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [RemoteServiceConfigurationComponent],
      providers: [
        { provide: RemoteServiceConfigurationService, useClass: RemoteServiceConfigurationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteServiceConfigurationComponent);
    injector = getTestBed();
    service = injector.get(RemoteServiceConfigurationService);
    spyOn(service, 'getRemoteServiceConfigurationAddress')
      .and
      .returnValue(of('test'));

    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeAddress successful', () => {
    beforeEach(() => {
      injector = getTestBed();
      service = injector.get(RemoteServiceConfigurationService);
      spyOn(service, 'setRemoteServiceConfigurationAddress')
        .and
        .returnValue(of('test'));

    });

    it('should change service address to new value', () => {
      const newAddress = 'newServiceAddress';
      component.newAddress = newAddress;
      component.changeAddress();

      expect(service.setRemoteServiceConfigurationAddress)
        .toHaveBeenCalledWith(component.newAddress);
    });

    it('should stop loading and edit', () => {
      const newAddress = 'newServiceAddress';
      component.newAddress = newAddress;
      component.changeAddress();

      expect(component.isLoading).toEqual(false);
      expect(component.isEdit).toEqual(false);
    });
  });

  describe('changeAddress error', () => {
    beforeEach(() => {
      injector = getTestBed();
      service = injector.get(RemoteServiceConfigurationService);
      spyOn(service, 'setRemoteServiceConfigurationAddress')
        .and
        .returnValue(throwError({ status: 400 }));
    });

    it('should not change service address to new value', () => {
      const newAddress = 'newServiceAddress';
      const oldAddress = 'oldServiceAddress';
      component.newAddress = newAddress;
      component.serviceAddress = oldAddress;
      component.changeAddress();

      expect(component.serviceAddress).toEqual(oldAddress);
    });
  });

  describe('switchToEdit', () => {
    it('should set isEdit to true', () => {
      component.isEdit = false;

      component.switchToEdit();

      expect(component.isEdit).toEqual(true);
    });
  });

  describe('switchToView', () => {
    it('should set isEdit to false', () => {
      component.isEdit = true;

      component.switchToView();

      expect(component.isEdit).toEqual(false);
    });
  });
});
