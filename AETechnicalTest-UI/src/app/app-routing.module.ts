import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ViewVehicleComponent } from './vehicles/view-vehicle/view-vehicle.component'

const routes: Routes = [
{
  path: '',
  component: VehiclesComponent
},
{
  path: 'vehicles',
  component: VehiclesComponent
},
{
  path: 'vehicles/:id',
  component: ViewVehicleComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
