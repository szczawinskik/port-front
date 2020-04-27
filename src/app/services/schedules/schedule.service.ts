import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Schedule } from 'src/commons/entities/Ship';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly apiUrl = 'api/Schedule/';
  constructor(private http: HttpClient) { }

  deleteSchedule(scheduleId: number) {
    return this.http.delete(`${this.apiUrl}/${scheduleId}`);
  }
  addSchedule(schedule: Schedule, shipId: number) {
    return this.http.post(`${this.apiUrl}${shipId}`, schedule);
  }
  editSchedule(schedule: Schedule) {
    return this.http.put(`${this.apiUrl}`, schedule);
  }
  bulkAdd(schedules: Schedule[], shipId: number) {
    return this.http.post(`${this.apiUrl}/BulkAdd/${shipId}`, schedules);
  }
}
