import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Station } from '../shared/station';
import { StationMarkerData } from '../shared/station_marker';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  private _current_station: Station | undefined = undefined;
  private _stations: Station[] = [];

  private _marker_data: StationMarkerData[] = [];

  constructor(
    private _ws: WeatherService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._ws.getStations().subscribe(stations => {
      this._stations = stations;
      this.loadCurrentStation();

      this._marker_data = this.loadMarkers();
    });
  }

  private loadCurrentStation(){
    const code = this._route.snapshot.params.code;
    const station = this._stations?.find(s => s.code == code);
    if(station) this._current_station = station;
  }

  handleSelectStation(station: Station){
    this.setCurrentStation(station);
  }

  handleCloseDetail(){
    this.setCurrentStation(undefined);
  }

  handleClickMarker(station: Station){
    this.setCurrentStation(station);
  }

  private loadMarkers(): StationMarkerData[] {
    let ret: StationMarkerData[] = [];
    this._stations.forEach(station => {
      ret.push({ station: station, highlighted: station === this.current_station });
    })
    return ret;
  }

  get current_station(): Station | undefined{
    return this._current_station;
  }

  get stations(): Station[] {
    return this._stations;
  }

  getMarkers(): StationMarkerData[]{
    return this._marker_data;
  }

  private setCurrentStation(station: Station | undefined){
    this._current_station = station;
    if(station != null) {
      this._location.go("station/" + station.code);
    }else{
      this._location.go("");
    }

    this._marker_data = this.loadMarkers();
  }

}
