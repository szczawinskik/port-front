import { Component, OnInit } from '@angular/core';
import { RemoteServiceConfigurationService } from '../services/remote-service-configuration.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remote-service-configuration',
  templateUrl: './remote-service-configuration.component.html',
  styleUrls: ['./remote-service-configuration.component.scss']
})
export class RemoteServiceConfigurationComponent implements OnInit {

  isEdit = false;
  serviceAddress = '';
  newAddress = '';
  isLoading = false;
  constructor(private service: RemoteServiceConfigurationService) { }

  ngOnInit() {
    this.getServiceAddress();
  }

  switchToEdit() {
    this.newAddress = this.serviceAddress;
    this.isEdit = true;
  }

  switchToView() {
    this.isEdit = false;
  }

  changeAddress() {
    this.isLoading = true;
    this.service.setRemoteServiceConfigurationAddress(this.newAddress)
      .subscribe(() => {
        this.serviceAddress = this.newAddress;
        this.isEdit = false;
        this.isLoading = false;
      });
  }

  private getServiceAddress() {
    this.isLoading = true;
    this.service.getRemoteServiceConfigurationAddress()
      .subscribe(currentAddress => {
        this.serviceAddress = currentAddress;
        this.isLoading = false;
      });
  }
}
