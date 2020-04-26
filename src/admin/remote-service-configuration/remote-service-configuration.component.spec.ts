import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteServiceConfigurationComponent } from './remote-service-configuration.component';

describe('RemoteServiceConfigurationComponent', () => {
  let component: RemoteServiceConfigurationComponent;
  let fixture: ComponentFixture<RemoteServiceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteServiceConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteServiceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
