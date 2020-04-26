import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from 'src/app/services/ships/ship.service';
import { Ship } from 'src/commons/entities/Ship';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent implements OnInit {

  shipId: number;
  ship: Ship;
  isLoading = false;

  constructor(private route: ActivatedRoute, private service: ShipService) { }

  ngOnInit() {
    this.isLoading = true;
    this.shipId = this.route.snapshot.params.shipId;
    if (this.shipId) {
      this.service
        .getShip(this.shipId)
        .subscribe(x => {
          this.ship = x;
          this.isLoading = false;
        });
    }

  }

}
