import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteServiceConfigurationService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'api/Configuration/RemoteServiceAddress';

  getRemoteServiceConfigurationAddress(): Observable<string> {
    return this.http.get<string>(this.apiUrl);
  }
  setRemoteServiceConfigurationAddress(value: string): Observable<string> {
    return this.http.post<any>(this.apiUrl, { value });
  }
}
