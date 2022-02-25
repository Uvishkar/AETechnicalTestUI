// import { Component, OnInit } from '@angular/core';
// import { VehicleService } from './vehicle.service';
// @Component({
//   selector: 'app-vehicles',
//   templateUrl: './vehicles.component.html',
//   styleUrls: ['./vehicles.component.css']
// })
// export class VehiclesComponent implements OnInit {

//   constructor(private vehicleService: VehicleService) { }

//   ngOnInit(): void {
//     //Get all Vehicles
//     this.vehicleService.getAllVehicles()
//     .subscribe(
//       (sucessResponse) =>{
//         console.log(sucessResponse);
//       },
//       (errorResponse) =>{
//         console.log(errorResponse)
//       }
//       );


//   }

// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from '../models/ui-models/Vehicle.model';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  Vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['VehicleType', 'Make', 'Model', 'Year', 'WheelCount', 'Active', 'Tax','RoadWorthyTestInterval'];
  dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private VehicleService: VehicleService) { }

  ngOnInit(): void {
    // Fetch Vehicles
    this.VehicleService.getAllVehicles()
      .subscribe(
        (successResponse) => {
          this.Vehicles = successResponse;
          this.dataSource = new MatTableDataSource<Vehicle>(this.Vehicles);

          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }

          if (this.matSort) {
            this.dataSource.sort = this.matSort;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  filterVehicles() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
