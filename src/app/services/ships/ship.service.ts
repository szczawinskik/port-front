import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ship } from 'src/commons/entities/Ship';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private readonly apiUrl = 'api/Ship/';
  constructor(private http: HttpClient) { }

  getShips() {
    return this.http.get<Ship[]>(`${this.apiUrl}GetAll`);
  }
}
