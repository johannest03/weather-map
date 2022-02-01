import { LngLatLike } from "mapbox-gl";

class Position{
    latitude: number = 0;
    longitude: number = 0;
    toLngLatLike(): LngLatLike{
        return { lng: this.longitude, lat: this.latitude };
    }
}

export interface Station {
  id: string;
  name: string;
  lastUpdated: string;
  position: Position;
  altitude: number;
  categoryId: number;
  code: string;
  dd: string;
  ff: string;
  hs: string;
  n: string;
  p: string;
  q: string;
  rh: string;
  t: string;
  w: string;
  sd: string;
  measurements: Measurement[];
}

export interface Measurement {
  code: string;
  description: string;
  imageUrl: string;
}
