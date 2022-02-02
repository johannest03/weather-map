import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Station } from '../shared/station';
import { WeatherService } from '../shared/weather.service';

const lat = 46.4892313;
const lng = 11.3121383;

const zoom = 8;
const minZoom = 8;
const maxZoom = 12;

const colorNormal = "#2874A6";
const colorHighlight = "#85C1E9";

const scaleNormal = 1;
const scaleHighlight = 1.25;

interface StationMarker{
  station: Station,
  marker: mapboxgl.Marker
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private _currentStation: Station | undefined;

  public map!: Map;
  private markers: StationMarker[] = [];
  public style = 'mapbox://styles/mapbox/light-v10?optimize=true';

  constructor(
    private _ws: WeatherService
  ) { }

  ngOnInit(): void {
    this.map = new Map({
      container: "map",
      style: this.style,
      zoom: zoom,
      minZoom: minZoom,
      maxZoom: maxZoom,
      center: [lng, lat],
      accessToken: environment.mapbox.accessToken,
      antialias: true
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this._ws.getStations().subscribe(stations => {
      this.clearMarkers();
      this.addStationsToMap(stations);
    });
  }

  get currentStation(): Station | undefined{
    return this._currentStation;
  }

  set currentStation(station: Station | undefined){
    let oldMarker = this.markers.find(marker => marker.station === this._currentStation);
    let marker = this.markers.find(marker => marker.station === station);

    this._currentStation = station;

    if(marker) this.switchColorAndScale(marker, colorHighlight, scaleHighlight);
    if(oldMarker) this.switchColorAndScale(oldMarker, colorNormal, scaleNormal);
  }

  private switchColorAndScale(marker: StationMarker, color: string, scale: number){
    const popup = marker.marker.getPopup();
    const location = marker.marker.getLngLat();

    marker.marker.remove();
    marker.marker = new mapboxgl.Marker({
      color,
      scale: scale,
    })
    .setLngLat(location)
    .setPopup(popup);

    marker.marker.addTo(this.map);
  }

  private clearMarkers(){
    this.markers.forEach(marker => {
      marker.marker.remove()
    });
    this.markers = [];
  }

  private addStationsToMap(stations: Station[]){
    stations.forEach(station => {

      const popup = new mapboxgl.Popup();
      popup.on("open", () => {
        this.currentStation = station;
      });

      const marker = new mapboxgl.Marker({
        color: colorNormal,
      })
      .setLngLat(station.position.toLngLatLike())
      .setPopup(popup);

      marker.addTo(this.map);
      this.markers.push({ station, marker });
    });
  }
  closeStation(){
    this.currentStation = undefined;
  }
}
