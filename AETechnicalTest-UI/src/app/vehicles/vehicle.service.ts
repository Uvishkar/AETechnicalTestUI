
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddVehicleRequest } from '../models/api-models/add-vehicle-request.model';
import { Vehicle } from '../models/api-models/vehicle.model';
import { UpdateVehicleRequest } from '../models/api-models/update-vehicle-request.model';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseApiUrl ='https://localhost:7220'

  constructor(private httpClient: HttpClient) {

  }

  getAllVehicles():Observable<any> {
   return this.httpClient.get<any>(this.baseApiUrl + '/Vehicles')
  }
  getVehicle(ID: string): Observable<Vehicle> {
    return this.httpClient.get<Vehicle>(this.baseApiUrl + '/Vehicles' + ID)
  }

  updateVehicle(ID: string, vehicleRequest: Vehicle): Observable<Vehicle> {
    const updateStudentRequest: UpdateVehicleRequest = {
      VehicleType: vehicleRequest.VehicleType,
      Make: vehicleRequest.Make,
      Model: vehicleRequest.Model,
      Year: vehicleRequest.Year,
      WheelCount: vehicleRequest.WheelCount,
      FuelType: vehicleRequest.FuelType,
      Active: vehicleRequest.Active,
      Tax: vehicleRequest.Tax,
      RoadWorthyTestIntervalstring: vehicleRequest.RoadWorthyTestIntervalstring,
    }

    return this.httpClient.put<Vehicle>(this.baseApiUrl + '/vehicles/' + ID, updateStudentRequest);
  }

  deleteVehicle(ID: string): Observable<Vehicle> {
    return this.httpClient.delete<Vehicle>(this.baseApiUrl + '/vehicles/' + ID);
  }

  addVehicle(vehicleRequest: Vehicle): Observable<Vehicle> {
    const addStudentRequest: AddVehicleRequest = {
      VehicleType: vehicleRequest.VehicleType,
      Make: vehicleRequest.Make,
      Model: vehicleRequest.Model,
      Year: vehicleRequest.Year,
      WheelCount: vehicleRequest.WheelCount,
      FuelType: vehicleRequest.FuelType,
      Active: vehicleRequest.Active,
      Tax: vehicleRequest.Tax,
      RoadWorthyTestIntervalstring: vehicleRequest.RoadWorthyTestIntervalstring,
    };

    return this.httpClient.post<Vehicle>(this.baseApiUrl + '/Vehicles/add', addStudentRequest);
  }
}
