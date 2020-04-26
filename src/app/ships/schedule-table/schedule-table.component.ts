import { Component, OnInit } from '@angular/core';
import { ShipService } from 'src/app/services/ships/ship.service';
import { Ship } from 'src/commons/entities/Ship';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnInit {

  currentTimeout: any;
  ships: Ship[];
  isLoading = false;
  autoRefresh = true;

  private readonly maxDistance = 99999999;

  constructor(private service: ShipService) { }

  ngOnInit() {
    this.loadShips();
  }

  autoRefreshChanged() {
    if (this.autoRefresh) {
      this.setReset();
    } else {
      clearTimeout(this.currentTimeout);
    }
  }

  private loadShips() {
    clearTimeout(this.currentTimeout);
    this.isLoading = true;
    this.service.getShips().subscribe(shipList => {
      this.ships = shipList
        .filter(x => x.closestSchedule && !x.closestSchedule.departureSent);
      this.setReset();
      this.isLoading = false;
    });
  }
  setReset() {
    if (!this.autoRefresh) {
      return;
    }
    let minDistance = this.maxDistance;
    let shipToWatch = null;
    let isArrival = false;
    const now = new Date();
    for (const ship of this.ships) {
      const arrivalDifference = (new Date(ship.closestSchedule.arrival).getTime() - now.getTime()) / 1000;
      if (arrivalDifference > 0 && minDistance > arrivalDifference) {
        isArrival = true;
        shipToWatch = ship;
        minDistance = arrivalDifference;
      }
      const departureDifference = (new Date(ship.closestSchedule.departure).getTime() - now.getTime()) / 1000;
      if (departureDifference > 0 && minDistance > departureDifference) {
        isArrival = false;
        shipToWatch = ship;
        minDistance = departureDifference;
      }
    }
    if (minDistance === this.maxDistance) {
      return;
    }
    this.currentTimeout = setTimeout(() => {
      this.loadShips();
    }, (minDistance + 5) * 1000);
  }

  private getDescription(value: boolean) {
    return value ? 'tak' : 'nie';
  }
}

