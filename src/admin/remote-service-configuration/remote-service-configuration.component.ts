import { Component, OnInit } from '@angular/core';
import { RemoteServiceConfigurationService } from '../services/remote-service-configuration.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remote-service-configuration',
  templateUrl: './remote-service-configuration.component.html',
  styleUrls: ['./remote-service-configuration.component.scss']
})
export class RemoteServiceConfigurationComponent implements OnInit {

  serviceAddress: Observable<string>;
  constructor(private service: RemoteServiceConfigurationService) { }

  ngOnInit() {
    this.getServiceAddress();
  }


  private getServiceAddress() {
    this.serviceAddress = this.service.getRemoteServiceConfigurationAddress();
  }
}
