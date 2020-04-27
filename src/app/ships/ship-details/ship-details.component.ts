import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from 'src/app/services/ships/ship.service';
import { Ship, Schedule } from 'src/commons/entities/Ship';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent implements OnInit {


  shipId: number;
  ship: Ship;
  isLoading = false;
  weekStart = new Date();
  weekEnd = new Date();
  schedulesInWeek: Schedule[] = [];
  deleteModal = false;
  editModal = false;
  arrivalValue: string;
  departureValue: string;
  selectedSchedule: Schedule = null;
  scheduleOverlap = false;


  copyModal: boolean;
  copyModalItems: Schedule[] = [];


  constructor(private route: ActivatedRoute, private service: ShipService,
    private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.setupWeek();
    this.isLoading = true;
    this.shipId = this.route.snapshot.params.shipId;
    if (this.shipId) {
      this.loadShipData();
    }
  }
  private loadShipData() {
    this.service
      .getShip(this.shipId)
      .subscribe(x => {
        this.ship = x;
        this.ship.schedules
          .map(s => {
            s.arrival = new Date(s.arrival);
            s.departure = new Date(s.departure);
            return s;
          });
        this.filterSchedules();
        this.isLoading = false;
      });
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date.getTime());
    result.setDate(date.getDate() + days);
    return result;
  }

  setupWeek() {
    const curr = new Date();
    const first = curr.getDay() === 1 ? curr.getDate() : curr.getDate() - curr.getDay() - 6;
    const last = first + 6;
    this.weekStart = new Date(curr.setDate(first));
    this.weekStart.setHours(0, 0, 0, 0);
    this.weekEnd = new Date(curr.setDate(last));
    this.weekEnd.setHours(0, 0, 0, 0);
  }

  previousWeek() {
    this.weekStart = this.addDays(this.weekStart, -7);
    this.weekEnd = this.addDays(this.weekEnd, -7);
    this.filterSchedules();
  }

  nextWeek() {
    this.weekStart = this.addDays(this.weekStart, 7);
    this.weekEnd = this.addDays(this.weekEnd, 7);
    this.filterSchedules();
  }
  filterSchedules() {
    const realWeekEnd = this.addDays(this.weekEnd, 1);
    this.schedulesInWeek = this.ship.schedules
      .filter(x => {
        return x.arrival > this.weekStart && realWeekEnd > x.arrival;
      }
      );
  }

  showDeleteModal(schedule: Schedule) {
    this.selectedSchedule = schedule;
    this.deleteModal = true;
  }
  hideDeleteModal() {
    this.deleteModal = false;
  }

  deleteSchedule() {
    if (this.selectedSchedule) {
      this.scheduleService
        .deleteSchedule(this.selectedSchedule.id)
        .subscribe(() => {
          this.loadShipData();
          this.hideDeleteModal();
        });
    }
  }
  showEditModal(schedule: Schedule) {
    if (!schedule) {
      this.selectedSchedule = { id: 0, arrival: new Date(), departure: new Date() };
    } else {
      this.selectedSchedule = schedule;
      this.selectedSchedule.arrival = new Date(this.selectedSchedule.arrival);
      this.selectedSchedule.departure = new Date(this.selectedSchedule.departure);
    }
    this.arrivalValue = this.getTime(this.selectedSchedule.arrival);
    this.departureValue = this.getTime(this.selectedSchedule.departure);
    this.editModal = true;
  }
  hideEditModal() {
    this.editModal = false;
  }

  getTime(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
  }

  saveSchedule() {
    if (this.isInOtherSchedule(this.selectedSchedule)) {
      this.scheduleOverlap = true;
      return;
    }
    this.scheduleOverlap = false;
    if (this.selectedSchedule) {
      this.selectedSchedule.arrival = new Date(this.arrivalValue);
      this.selectedSchedule.departure = new Date(this.departureValue);
      if (this.selectedSchedule.id) {
        this.scheduleService
          .editSchedule(this.selectedSchedule)
          .subscribe(() => {
            this.loadShipData();
            this.hideEditModal();
          });
      } else {
        this.scheduleService
          .addSchedule(this.selectedSchedule, this.shipId)
          .subscribe(() => {
            this.loadShipData();
            this.hideEditModal();
          });
      }

    }
  }
  isInOtherSchedule(selectedSchedule: Schedule) {
    for (const schedule of this.ship.schedules) {
      if (this.schedulesOverlap(schedule, selectedSchedule)) {
        return true;
      }
    }
    return false;
  }

  schedulesOverlap(schedule1: Schedule, schedule2: Schedule): boolean {
    if (schedule1.id === schedule2.id) {
      return false;
    }
    return (schedule1.arrival <= schedule2.arrival && schedule2.arrival < schedule1.departure) ||
      (schedule1.arrival >= schedule2.arrival && schedule2.arrival > schedule1.departure);
  }

  get invalidDate() {
    const regex = new RegExp('^\\d{4}-\\d{1,2}-\\d{1,2} \\d{1,2}:\\d{1,2}$');
    return !(new Date(this.arrivalValue).getFullYear() && new Date(this.departureValue).getFullYear()
      && regex.test(this.arrivalValue) && regex.test(this.departureValue) && this.validateRange);
  }

  get validateRange(): boolean {
    return new Date(this.arrivalValue) <= new Date(this.departureValue);
  }

  hideCopyModal() {
    this.copyModal = false;
  }

  copyCurrentWeek() {
    if (this.schedulesInWeek.length === 0) {
      return;
    }
    this.copyModal = true;
    this.copyModalItems = [];
    this.copyModal = true;
    for (const schedule of this.schedulesInWeek) {
      this.copyModalItems.push(
        {
          id: 0,
          arrival: new Date(schedule.arrival),
          departure: new Date(schedule.departure),
        }
      );
    }
  }
}
