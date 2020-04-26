import { NgModule } from '@angular/core';
import { CommonsModule } from 'src/commons/commons.module';
import { Routes, RouterModule } from '@angular/router';
import { RemoteServiceConfigurationComponent } from './remote-service-configuration/remote-service-configuration.component';



const routes: Routes = [
  {
    path: '',
    component: RemoteServiceConfigurationComponent
  }
];

@NgModule({
  declarations: [RemoteServiceConfigurationComponent],
  imports: [
    CommonsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
