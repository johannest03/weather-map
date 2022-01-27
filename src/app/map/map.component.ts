import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Station } from '../shared/station';

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

    for(let i = 0; i < 100; i++){
      new mapboxgl.Marker({
        color: "#F00",
      })
      .setLngLat(this.randomPosition())
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
      .addTo(this.map);
    }
  }

  private randomPosition(): mapboxgl.LngLatLike{
    let ret: mapboxgl.LngLatLike = { lng: 0, lat: 0 };

    ret.lat = this.randomNumberBetween(46.983155152961736, 46.19563031598852);
    ret.lng = this.randomNumberBetween(12.37097000960092, 10.407948265318456);

    return ret;
  }

  private randomNumberBetween(max: number, min: number): number{
    return Math.random() * (max - min) + min;
  }

}
