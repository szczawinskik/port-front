import { Component, OnInit } from '@angular/core';
import { ShipService } from 'src/app/services/ships/ship.service';
import { Ship } from 'src/commons/entities/Ship';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnInit {


  ships: Ship[];
  isLoading = false;
  constructor(private service: ShipService) { }

  ngOnInit() {
    this.loadShips();
  }


  private loadShips() {
    this.isLoading = true;
    this.service.getShips().subscribe(shipList => {
      this.ships = shipList.filter(x => x.closestSchedule);
      this.isLoading = false;
    });
  }
}

