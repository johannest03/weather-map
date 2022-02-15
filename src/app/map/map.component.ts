import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Station } from '../shared/station';
import { StationMarker, StationMarkerData } from '../shared/station_marker';

const lat = 46.4892313;
const lng = 11.3121383;

const zoom = 8;
const minZoom = 8;
const maxZoom = 12;

const colorNormal = "#2874A6";
const colorHighlight = "#85C1E9";

const scaleNormal = 1;
const scaleHighlight = 1.25;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output("clickMarker") public clickMarkerEmit: EventEmitter<Station> = new EventEmitter<Station>();

  @Input("markers") public set markers(markers: StationMarkerData[]){
    this.clearMarkers();
    
    this._markers = this.loadDataToMakers(markers);
  }
  private _markers: StationMarker[] = [];

  public map!: Map;
  public style = 'mapbox://styles/mapbox/light-v10?optimize=true';

  constructor() {}

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

  private clearMarkers(){
    this._markers.forEach(marker => {
      marker.marker.remove()
    });
    this._markers = [];
  }

  private loadDataToMakers(stationsData: StationMarkerData[]): StationMarker[]{
    let ret: StationMarker[] = [];

    stationsData.forEach(data => {
      const popup = new mapboxgl.Popup();
      popup.on("open", () => {
        this.clickMarkerEmit.emit(data.station);
      });

      const marker = new mapboxgl.Marker({
        color: data.highlighted ? colorHighlight : colorNormal,
        scale: data.highlighted ? scaleHighlight : scaleNormal
      })
      .setLngLat(data.station.position.toLngLatLike())
      .setPopup(popup);

      marker.addTo(this.map);
      ret.push({ station: data.station, marker: marker, highlighted: data.highlighted });
    });
    return ret;
  }
}
