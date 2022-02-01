import { LngLatLike } from "mapbox-gl";

export class Position{
    constructor(
      public latitude: number,
      public longitude: number
    ){}

    toLngLatLike(): LngLatLike{
        return { lng: this.longitude, lat: this.latitude };
    }
}

export class Station {
  id: string = "";
  name: string = "";
  lastUpdated: string = "";
  position: Position = new Position(0, 0);
  altitude: number = 0;
  categoryId: number = 0;
  code: string = "";
  dd: string = "";
  ff: string = "";
  hs: string = "";
  n: string = "";
  p: string = "";
  q: string = "";
  rh: string = "";
  t: string = "";
  w: string = "";
  sd: string = "";
  measurements: Measurement[] = [];
}

export interface Measurement {
  code: string;
  description: string;
  imageUrl: string;
}
