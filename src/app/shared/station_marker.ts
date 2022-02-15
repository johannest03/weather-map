import { Station } from "./station";

export interface StationMarker{
    station: Station,
    marker: mapboxgl.Marker,
    highlighted: boolean
}

export interface StationMarkerData{
    station: Station,
    highlighted: boolean
}