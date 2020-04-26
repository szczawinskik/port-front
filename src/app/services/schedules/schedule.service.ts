import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly apiUrl = 'api/Schedule/';
  constructor(private http: HttpClient) { }

  deleteSchedule(scheduleId: number) {
    return this.http.delete(`${this.apiUrl}/${scheduleId}`);
  }
}
