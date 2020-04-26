import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShipsListComponent } from './ships/ships-list/ships-list.component';
import { ShipDetailsComponent } from './ships/ship-details/ship-details.component';
import { ScheduleTableComponent } from './ships/schedule-table/schedule-table.component';


const routes: Routes = [
  {
    path: 'configuration',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'schedules-table',
    component: ScheduleTableComponent,
    pathMatch: 'full'
  },
  {
    path: 'ship-list',
    component: ShipsListComponent,
    pathMatch: 'full'
  },
  {
    path: 'ship-details/:shipId',
    component: ShipDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
