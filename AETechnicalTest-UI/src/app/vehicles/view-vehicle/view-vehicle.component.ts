import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/ui-models/Vehicle.model';
import { VehicleService } from '../vehicle.service';
@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  ID: string | null | undefined;
  vehicle: Vehicle = {
    ID:'',
    VehicleType:'',
    Make:'',
    Model:'',
    Year:0,
    WheelCount:0,
    FuelType:'',
    Active:false,
    Tax:0,
    RoadWorthyTestIntervalstring:''
  };

  isNewVehicle = false;
  header = '';
  displayProfileImageUrl = '';


  @ViewChild('vehicleDetailsForm') vehicleDetailsForm?: NgForm;

  constructor(private readonly vehicleService: VehicleService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.ID = params.get('id');

        if (this.ID) {
          if (this.ID.toLowerCase() === 'Add'.toLowerCase()) {
            // -> new Vehicle Functionality
            this.isNewVehicle = true;
            this.header = 'Add New Vehicle';

          } else {
            // -> Existing Vehicle Functionality
            this.isNewVehicle = false;
            this.header = 'Edit Vehicle';
            this.vehicleService.getVehicle(this.ID)
              .subscribe(
                (successResponse) => {
                  this.vehicle = successResponse;
                },
                (errorResponse) => {
                  console.log(errorResponse);
                }
              );
          }

        }
      }
    );
  }

  onUpdate(): void {
    if (this.vehicleDetailsForm?.form.valid) {
      this.vehicleService.updateVehicle(this.vehicle.ID, this.vehicle)
        .subscribe(
          (successResponse) => {
            // Show a notification
            this.snackbar.open('Vehicles updated successfully', undefined, {
              duration: 2000
            });
          },
          (errorResponse) => {
            // Log it
            console.log(errorResponse);
          }
        );
    }
  }

  onDelete(): void {
    this.vehicleService.deleteVehicle(this.vehicle.ID)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Vehicles deleted successfully', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            this.router.navigateByUrl('vehicles');
          }, 2000);
        },
        (errorResponse) => {
          // Log
        }
      );
  }

  onAdd(): void {
    if (this.vehicleDetailsForm?.form.valid) {
      // Submit form date to api
      this.vehicleService.addVehicle(this.vehicle)
        .subscribe(
          (successResponse) => {
            this.snackbar.open('Vehicles added successfully', undefined, {
              duration: 2000
            });

            setTimeout(() => {
              this.router.navigateByUrl(`vehicles/${successResponse.ID}`);
            }, 2000);

          },
          (errorResponse) => {
            // Log
            console.log(errorResponse);
          }
        );
    }
  }

}
