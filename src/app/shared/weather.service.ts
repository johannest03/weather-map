import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from './station';
import { map } from 'rxjs/operators';

const API_URL = "https://tourism.opendatahub.bz.it/v1/Weather/";

interface StationData {
  altitude: number;
  categoryId: number;
  code: string;
  id: string;
  dd: string;
  ff: string;
  hs: string;
  lastUpdated: string;
  latitude: number;
  longitude: number;
  lwdType?: string;
  n: string;
  name: string;
  p: string;
  q: string;
  rh: string;
  t: string;
  vaxcode?: any;
  w: string;
  wmax?: any;
  sd: string;
  visibility: string;
  zoomLevel?: any;
  measurements: MeasurementData[];
}

interface MeasurementData {
  code: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private _httpClient: HttpClient
  ){}

  getStations(): Observable<Station[]>{
    return this._httpClient.get<any>(API_URL + "Realtime?language=de")
      .pipe(
        map((rawStations) => rawStations.map((stationData: StationData) => this.stationDataToStation(stationData)))
      );
  }
 
  private stationDataToStation(stationData: StationData): Station{
    const station = new Station();
    station.id = stationData.id;
    station.categoryId = stationData.categoryId;
    station.code = stationData.code;
    station.name = stationData.name;
    station.position.longitude = stationData.longitude;
    station.position.latitude = stationData.latitude;
    station.lastUpdated = stationData.lastUpdated;
    station.altitude = stationData.altitude;
    station.dd = stationData.dd;
    station.ff = stationData.ff;
    station.hs = stationData.hs;
    station.n = stationData.n;
    station.p = stationData.p
    station.q = stationData.q;
    station.rh = stationData.rh;
    station.t = stationData.t;
    station.w = stationData.w;
    station.sd = stationData.sd;
    station.measurements = stationData.measurements;

    return station;
  }

}
