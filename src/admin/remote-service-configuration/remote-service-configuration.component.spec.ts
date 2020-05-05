import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';

import { RemoteServiceConfigurationComponent } from './remote-service-configuration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RemoteServiceConfigurationService } from '../services/remote-service-configuration.service';
import { of } from 'rxjs';



class RemoteServiceConfigurationServiceMock {
  getRemoteServiceConfigurationAddress() { return null; }
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
});
