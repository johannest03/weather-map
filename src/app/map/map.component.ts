import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Station, Position } from '../shared/station';

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

  public map!: Map;
  private markers: mapboxgl.Marker[] = [];
  public style = 'mapbox://styles/mapbox/light-v10?optimize=true';

  constructor() { }

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

    let stations: Station[] = [];

    for(let i = 0; i < 100; i++){
      const station = new Station();
      station.id = "898123";
      station.name = "x";
      station.position = this.randomPosition();

      stations.push(station);
    }

    this.clearMarkers();
    this.addStationsToMap(stations);
  }

  private clearMarkers(){
    this.markers.forEach(marker => {
      marker.remove()
    });
  }

  private addStationsToMap(stations: Station[]){
    stations.forEach(station => {
      const marker = new mapboxgl.Marker({
        color: "#F00",
      })
      .setLngLat(station.position.toLngLatLike())
      .setPopup(new mapboxgl.Popup().setHTML("<h1>" + station.id + " | " + station.name + "</h1>"));

      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  private randomPosition(): Position{
    let ret: Position = new Position(0, 0);

    ret.latitude = this.randomNumberBetween(46.983155152961736, 46.19563031598852);
    ret.longitude = this.randomNumberBetween(12.37097000960092, 10.407948265318456);

    return ret;
  }

  private randomNumberBetween(max: number, min: number): number{
    return Math.random() * (max - min) + min;
  }

}
