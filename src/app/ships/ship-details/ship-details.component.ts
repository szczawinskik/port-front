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
  readonly regex = new RegExp('^\\d{4}-\\d{1,2}-\\d{1,2} \\d{1,2}:\\d{1,2}$');

  copyModal: boolean;
  copyModalItems: Schedule[] = [];
  copyModalArrivals: string[] = [];
  copyModalDepartures: string[] = [];
  modalWeekStart = new Date();
  modalWeekEnd = new Date();


  constructor(private route: ActivatedRoute, private service: ShipService,
    private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.setupWeek(new Date());
    this.isLoading = true;
    this.shipId = this.route.snapshot.params.shipId;
    if (this.shipId) {
      this.loadShipData();
    }
  }
  loadShipData() {
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

  setupWeek(date: Date) {
    let curr = new Date(date.toUTCString());
    const first = curr.getDay() === 1 ? curr.getDate() : curr.getDate() - (curr.getDay() === 0 ? 7 : curr.getDay()) + 1;
    const last = first + 6;
    this.weekStart = new Date(curr.setDate(first));
    this.weekStart.setHours(0, 0, 0, 0);
    this.weekEnd = new Date(curr.setDate(last));
    this.weekEnd.setHours(0, 0, 0, 0);

    curr = new Date(date.toUTCString());
    this.modalWeekStart = new Date(curr.setDate(first));
    this.modalWeekStart.setHours(0, 0, 0, 0);
    this.modalWeekEnd = new Date(curr.setDate(last));
    this.modalWeekEnd.setHours(0, 0, 0, 0);
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

  modalPreviousWeek() {
    this.modalWeekStart = this.addDays(this.modalWeekStart, -7);
    this.modalWeekEnd = this.addDays(this.modalWeekEnd, -7);
    this.copyCurrentWeek();
  }

  modalNextWeek() {
    this.modalWeekStart = this.addDays(this.modalWeekStart, 7);
    this.modalWeekEnd = this.addDays(this.modalWeekEnd, 7);
    this.copyCurrentWeek();
  }

  filterSchedules() {
    const realWeekEnd = this.addDays(this.weekEnd, 1);
    this.schedulesInWeek = this.ship.schedules
      .filter(x => {
        return x.arrival > this.weekStart && realWeekEnd > x.arrival;
      });
  }

  showDeleteModal(schedule: Schedule) {
    this.selectedSchedule = schedule;
    this.deleteModal = true;
  }
  hideDeleteModal() {
    this.deleteModal = false;
  }

  onSuccessfulDelete() {
    this.loadShipData();
    this.hideDeleteModal();
  }

  showEditModal(schedule: Schedule) {
    if (!schedule) {
      this.selectedSchedule = { id: 0, arrival: new Date(), departure: new Date() };
    } else {
      this.selectedSchedule = schedule;
      this.selectedSchedule.arrival = new Date(this.selectedSchedule.arrival);
      this.selectedSchedule.departure = new Date(this.selectedSchedule.departure);
    }
    this.arrivalValue = this.getDateTime(this.selectedSchedule.arrival);
    this.departureValue = this.getDateTime(this.selectedSchedule.departure);
    this.editModal = true;
  }
  hideEditModal() {
    this.editModal = false;
  }

  getDateTime(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
  }

  saveSchedule() {
    this.selectedSchedule.arrival = new Date(this.arrivalValue);
    this.selectedSchedule.departure = new Date(this.departureValue);
    if (this.isInOtherSchedule(this.selectedSchedule)) {
      this.scheduleOverlap = true;
      return;
    }
    this.scheduleOverlap = false;
    if (this.selectedSchedule) {
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
    if (schedule1.id === schedule2.id && schedule1.id !== 0) {
      return false;
    }
    return (schedule1.arrival <= schedule2.arrival && schedule2.arrival < schedule1.departure) ||
      (schedule1.arrival >= schedule2.arrival && schedule2.arrival > schedule1.departure);
  }

  invalidDate(date: string) {
    return !(new Date(date).getFullYear() && new Date(date).getFullYear()
      && this.regex.test(date) && this.validateRange);
  }

  validateRange(date1: Date, date2: Date): boolean {
    return date1 <= date2;
  }

  hideCopyModal() {
    this.copyModal = false;
  }

  invalidAny(date1: string, date2: string): boolean {
    return this.invalidDate(date1) || this.invalidDate(date2) || !this.validateRange(new Date(date1), new Date(date2));
  }

  invalidInCopy(): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.copyModalArrivals.length; i++) {
      if (this.invalidAny(this.copyModalArrivals[i], this.copyModalDepartures[i])) {
        return true;
      }
    }
    return false;
  }

  copyCurrentWeek() {
    if (this.schedulesInWeek.length === 0) {
      return;
    }
    this.copyModal = true;
    this.copyModalItems = [];
    this.copyModalArrivals = [];
    this.copyModalDepartures = [];
    this.copyModal = true;
    for (const schedule of this.schedulesInWeek) {
      const diff1 = schedule.arrival.getTime() - this.weekStart.getTime();
      const diff2 = schedule.departure.getTime() - this.weekStart.getTime();
      const copySchedule = {
        id: 0,
        arrival: new Date(this.modalWeekStart.getTime() + diff1),
        departure: new Date(this.modalWeekStart.getTime() + diff2),
      };
      this.copyModalArrivals.push(this.getDateTime(copySchedule.arrival));
      this.copyModalDepartures.push(this.getDateTime(copySchedule.departure));
      this.copyModalItems.push(copySchedule);
    }
  }


  copySchedule() {
    this.scheduleOverlap = false;
    const schedulesToSend: Schedule[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.copyModalArrivals.length; i++) {
      schedulesToSend.push({
        id: 0,
        arrival: new Date(this.copyModalArrivals[i]),
        departure: new Date(this.copyModalDepartures[i])
      });
    }
    for (const schedule of schedulesToSend) {
      if (this.isInOtherSchedule(schedule)) {
        this.scheduleOverlap = true;
        return;
      }
    }
    this.scheduleOverlap = false;
    this.scheduleService.bulkAdd(schedulesToSend, this.shipId)
      .subscribe(() => {
        this.loadShipData();
        this.hideCopyModal();
      });
  }
}
