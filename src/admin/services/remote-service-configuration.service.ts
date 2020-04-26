import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteServiceConfigurationService {

  constructor(private http: HttpClient) { }

  getRemoteServiceConfigurationAddress(): Observable<string> {
    return this.http.get<string>('Configuration/RemoteServiceAddress');
  }
}
