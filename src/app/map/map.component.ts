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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public currentStation: Station | undefined;

  public map!: Map;
  private markers: mapboxgl.Marker[] = [];
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

  private clearMarkers(){
    this.markers.forEach(marker => {
      marker.remove()
    });
  }

  private addStationsToMap(stations: Station[]){
    stations.forEach(station => {

      const popup = new mapboxgl.Popup();
      popup.on("open", () => {
        this.currentStation = station;
      });

      const marker = new mapboxgl.Marker({
        color: "#F00",
      })
      .setLngLat(station.position.toLngLatLike())
      .setPopup(popup);

      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

}
