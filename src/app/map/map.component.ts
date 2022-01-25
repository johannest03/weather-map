import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment';

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
  }

}
